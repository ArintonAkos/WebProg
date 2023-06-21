import { Response } from 'express';
import Reservation from '../models/reservation';
import { validateReservationTime, validateStartTime } from '../services/reservationService';
import Restaurant from '../models/restaurant';
import User from '../models/user';
import Request from '../types/request.types';
import { AddReservationRequest, GetReservedTablesRequest } from '../requests/reservationRequestTypes';

export const addReservation = async (req: AddReservationRequest, res: Response) => {
  try {
    const { email, phone, date, time, tableIds, numberOfGuests } = req.body;
    const { restaurantId } = req.params;

    const parsedDate = new Date(date).toISOString().split('T')[0];
    const reservationStartTime = new Date(`${parsedDate}T${time}`);
    const reservationEndTime = new Date(reservationStartTime.getTime() + 30 * 60 * 1000); // 30 minutes later

    if (!validateStartTime(reservationStartTime)) {
      return res.status(400).json({
        showToast: true,
        message: 'Cannot make a reservation in the past!',
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        showToast: true,
        message: 'Restaurant not found!',
      });
    }

    if (!(await validateReservationTime(reservationStartTime, reservationEndTime, restaurantId))) {
      return res.status(401).json({
        showToast: true,
        message:
          'The restaurant is not open in these hours! Please check the Opening Hours! The last reservation can be made 30 minutes before closing!',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        showToast: true,
        message: 'User not found!',
      });
    }

    const promises = tableIds.map(async (tableId): Promise<void> => {
      const existingTableReservation = await Reservation.findOne({
        restaurant: restaurantId,
        tables: { $in: [tableId] },
        $or: [
          { time: { $gte: reservationStartTime, $lt: reservationEndTime } },
          {
            time: { $lt: reservationStartTime },
            $expr: { $gt: [{ $add: ['$time', 30 * 60 * 1000] }, reservationStartTime] },
          },
        ],
      });

      if (existingTableReservation) {
        throw {
          showToast: true,
          message: `Table ${tableId} is already reserved for this time interval.`,
        };
      }
    });

    try {
      await Promise.all(promises);
    } catch (e) {
      res.status(400).json(e);
    }

    const reservation = new Reservation({
      user: user.id,
      restaurant: restaurantId,
      time: reservationStartTime,
      numberOfGuests,
      tables: tableIds,
      phone,
      email,
    });

    await reservation.save();

    return res.status(201).json({
      showToast: true,
      message: 'Reservation created successfully',
      reservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      showToast: true,
      message: 'Error creating reservation',
    });
  }
};

export const getReservationsByRestaurantId = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const reservations = await Reservation.find({ restaurant: restaurantId })
      .populate('user')
      .populate('restaurant')
      .exec();

    return res.status(200).json({ reservations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving reservations' });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findById(reservationId).populate('restaurant').populate('user').exec();

    if (!reservation) {
      return res.status(404).json({
        showToast: true,
        message: 'Reservation not found!',
      });
    }

    const userId = req.user.id.toString();
    const reservationUserId = reservation.user._id.toString();

    if (userId !== reservationUserId) {
      return res.status(403).json({
        showToast: true,
        message: 'You do not have permission to delete this reservation',
      });
    }

    await reservation.deleteOne();

    return res.status(200).json({
      showToast: true,
      message: 'Reservation deleted successfully',
      type: 'success',
      id: reservationId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      showToast: true,
      message: 'Error deleting reservation',
    });
  }
};

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const reservations = await Reservation.find({ user: userId }).populate('user').populate('restaurant').exec();

    return res.status(200).json({ reservations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving reservations' });
  }
};

export const getManagedReservations = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        showToast: true,
        message: 'User not found!',
      });
    }

    const restaurantIds = (req.user.adminRestaurants ?? []).map((adminRestaurant) => adminRestaurant._id);

    const reservations = await Reservation.find({
      restaurant: { $in: restaurantIds },
    })
      .populate('restaurant')
      .populate('user')
      .exec();

    return res.status(200).json({ reservations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving reservations' });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const updateData = req.body;
    const reservation = await Reservation.findByIdAndUpdate(reservationId, updateData, { new: true });

    if (!reservation) {
      return res.status(404).json({
        showToast: true,
        message: 'Reservation not found!',
      });
    }

    const populatedReservation = await Reservation.findById(reservation._id)
      .populate('user')
      .populate('restaurant')
      .exec();

    return res.status(200).json({
      showToast: true,
      message: 'Reservation updated successfully',
      reservation: populatedReservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      showToast: true,
      message: 'Error updating reservation',
    });
  }
};

export const getReservedTablesByRestaurantId = async (req: GetReservedTablesRequest, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const { date, time } = req.query;

    const reservationStartTime = new Date(`${date}T${time}`);
    const reservationEndTime = new Date(reservationStartTime.getTime() + 30 * 60 * 1000);

    const reservations = await Reservation.find({
      restaurant: restaurantId,
      $or: [
        { time: { $gte: reservationStartTime, $lt: reservationEndTime } },
        {
          time: { $lt: reservationStartTime },
          $expr: { $gt: [{ $add: ['$time', 30 * 60 * 1000] }, reservationStartTime] },
        },
      ],
    })
      .populate('tables')
      .exec();

    const reservedTables = reservations.flatMap((reservation) => reservation.tables);

    return res.status(200).json({ reservedTables });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving reserved tables' });
  }
};

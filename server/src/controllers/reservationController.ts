import { Response } from 'express';
import Reservation from '../models/reservation';
import { validateReservationTime, validateStartTime } from '../services/reservationService';
import Restaurant from '../models/restaurant';
import User from '../models/user';
import Request from '../types/request.types';

export const addReservation = async (req: Request, res: Response) => {
  try {
    const { userId, date, time, numberOfGuests } = req.body;
    const restaurantId = req.params.restaurantId;

    const reservationStartTime = new Date(`${date}T${time}`);
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

    if (!(await User.findById(userId))) {
      return res.status(404).json({
        showToast: true,
        message: 'User not found!',
      });
    }

    const existingReservation = await Reservation.findOne({
      restaurantId,
      $or: [
        { time: { $gte: reservationStartTime, $lt: reservationEndTime } },
        {
          time: { $lt: reservationStartTime },
          $expr: { $gt: [{ $add: ['$time', 30 * 60 * 1000] }, reservationStartTime] },
        },
      ],
    });

    if (existingReservation) {
      return res.status(400).json({
        showToast: true,
        message: 'There is already a reservation for this restaurant at this time.',
      });
    }

    if (!(await validateReservationTime(reservationStartTime, reservationEndTime, restaurantId))) {
      return res.status(401).json({
        showToast: true,
        message:
          'The restaurant is not open in these hours! Please check the Opening Hours! The last reservation can be made 30 minutes before closing!',
      });
    }

    const reservation = new Reservation({
      userId,
      time: reservationStartTime,
      numberOfGuests,
      restaurantId,
    });

    await reservation.save();

    res.status(201).json({
      showToast: true,
      message: 'Reservation created successfully',
      reservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      showToast: true,
      message: 'Error creating reservation',
    });
  }
};

export const getReservationsByRestaurantId = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;
    const reservations = await Reservation.find({ restaurantId }).populate('userId').populate('restaurantId').exec();

    res.status(200).json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving reservations' });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findById(reservationId).populate('restaurantId').populate('userId').exec();

    if (!reservation) {
      return res.status(404).json({
        showToast: true,
        message: 'Reservation not found!',
      });
    }

    const userId = req.user.id.toString();
    const reservationUserId = reservation.userId._id.toString();

    if (userId !== reservationUserId) {
      return res.status(403).json({
        showToast: true,
        message: 'You do not have permission to delete this reservation',
      });
    }

    await reservation.deleteOne();

    res.status(200).json({
      showToast: true,
      message: 'Reservation deleted successfully',
      type: 'warning',
      id: reservationId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      showToast: true,
      message: 'Error deleting reservation',
    });
  }
};

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const reservations = await Reservation.find({ userId }).populate('userId').populate('restaurantId').exec();

    res.json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving reservations' });
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

    const restaurantIds = req.user.adminRestaurants.map((adminRestaurant) => adminRestaurant._id);
    const reservations = await Reservation.find({
      restaurantId: { $in: restaurantIds },
    })
      .populate('restaurantId')
      .populate('userId')
      .exec();

    res.json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving reservations' });
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
      .populate('userId')
      .populate('restaurantId')
      .exec();

    res.status(200).json({
      showToast: true,
      message: 'Reservation updated successfully',
      reservation: populatedReservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      showToast: true,
      message: 'Error updating reservation',
    });
  }
};

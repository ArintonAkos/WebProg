import { Request, Response } from 'express';
import Reservation from '../models/reservation';

export const addReservation = async (req: Request, res: Response) => {
  try {
    const { name, contactInfo, date, time, numberOfGuests } = req.body;
    const restaurantId = req.params.restaurantId;

    const reservationStartTime = new Date(`${date}T${time}`);
    const reservationEndTime = new Date(reservationStartTime.getTime() + 30 * 60 * 1000); // 30 minutes later

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
      return res
        .status(400)
        .json({ showToast: true, message: 'There is already a reservation for this restaurant at this time.' });
    }

    const reservation = new Reservation({
      name,
      contactInfo,
      time: reservationStartTime,
      numberOfGuests,
      restaurantId,
    });

    await reservation.save();

    res.status(201).json({ showToast: true, message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ showToast: true, message: 'Error creating reservation' });
  }
};

export const getReservationsByRestaurantId = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;
    const reservations = await Reservation.find({ restaurantId });

    res.json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving reservations' });
  }
};

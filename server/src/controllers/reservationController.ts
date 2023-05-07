import { Request, Response } from 'express';
import Reservation from '../models/reservation';
import { validateReservationTime, validateStartTime } from '../services/reservationService';

export const addReservation = async (req: Request, res: Response) => {
  try {
    const { name, contactInfo, date, time, numberOfGuests } = req.body;
    const restaurantId = req.params.restaurantId;

    const reservationStartTime = new Date(`${date}T${time}`);
    const reservationEndTime = new Date(reservationStartTime.getTime() + 30 * 60 * 1000); // 30 minutes later

    if (!validateStartTime(reservationStartTime)) {
      console.log('Invalid start time');

      res.status(401).json({
        showToast: true,
        message: 'Cannot make a reservation in the past!',
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

    console.log('EEEEEEEEEEEEEEEEEEEEEEEE', existingReservation);
    if (existingReservation) {
      res
        .status(400)
        .json({ showToast: true, message: 'There is already a reservation for this restaurant at this time.' });

      return;
    }

    console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
    if (!(await validateReservationTime(reservationStartTime, reservationEndTime, existingReservation))) {
      res.status(401).json({
        showToast: true,
        message: 'Cannot make a reservation in the past!',
      });

      return;
    }

    const reservation = new Reservation({
      name,
      contactInfo,
      time: reservationStartTime,
      numberOfGuests,
      restaurantId,
    });

    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
    await reservation.save();

    console.log('Eljutottam idaig!');
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

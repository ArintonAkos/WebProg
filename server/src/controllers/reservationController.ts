import { Request, Response } from 'express';
import Reservation from '../models/reservation';

export const addReservation = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, date, time, numberOfGuests, restaurantId } = req.body;
    const reservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      numberOfGuests,
      restaurantId,
    });

    await reservation.save();

    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation' });
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

import express from 'express';
import { sendReservation, getAllReservations } from '../controller/reservation.js';

const router = express.Router();

router.post('/send', sendReservation);
router.get('/', getAllReservations); 

export default router;

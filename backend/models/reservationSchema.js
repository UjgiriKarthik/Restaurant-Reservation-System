// models/reservationSchema.js
import mongoose from 'mongoose';
import validator from 'validator';

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, 'First name must be at least 3 characters long'],
    maxLength: [30, 'First name must not exceed 30 characters']
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, 'Last name must be at least 3 characters long'],
    maxLength: [30, 'Last name must not exceed 30 characters']
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  time: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(v);
      },
      message: props => `${props.value} is not a valid time! Please use 12-hour format like "05:30 PM"`
    }
  },
  date: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Reservation = mongoose.model('Reservation', reservationSchema);

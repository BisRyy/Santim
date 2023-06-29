import { Schema, model, models } from 'mongoose';

const donationSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
  },
  amount: {
    type: Number,
    // required: true,
  },
  goal: {
    type: Number,
    // required: true,
  },
  donors: [
    {
      name: {
        type: String,
        // required: true,
      },
      email: {
        type: String,
        // required: true,
      },
      amount: {
        type: Number,
        // required: true,
      },
      phone: {
        type: String,
        // required: true,
      },
      status: {
        type: String,
        default: 'pending',
      },
    },
  ],
});

const Donation = models.Donation || model('Donation', donationSchema);

export default Donation;

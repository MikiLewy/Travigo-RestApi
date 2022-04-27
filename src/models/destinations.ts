import mongoose, { Schema } from 'mongoose';

const destinationsSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Destinations', destinationsSchema);

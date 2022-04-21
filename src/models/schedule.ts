import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const scheduleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: String,
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
    creator: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Schedule', scheduleSchema);

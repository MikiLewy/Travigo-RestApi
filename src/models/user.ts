import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  schedule: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Schedule',
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Destinations',
    },
  ],
});

export default mongoose.model('User', userSchema);

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
      ref: 'Favorite',
      required: false,
      sparse: true,
    },
  ],
  totalBalance: {
    type: Number,
    default: 500,
  },
});

export default mongoose.model('User', userSchema);

import mongoose, { Schema } from 'mongoose';

const favoriteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  destination: {
    type: Schema.Types.ObjectId,
    ref: 'Destinations',
  },
});

export default mongoose.model('Favorite', favoriteSchema);

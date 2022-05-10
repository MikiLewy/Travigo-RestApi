import mongoose, { Schema } from 'mongoose';

const ticketsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  destination: {
    type: Schema.Types.ObjectId,
    ref: 'Destinations',
  },
});

export default mongoose.model('Ticket', ticketsSchema);

import mongoose, { Schema } from 'mongoose';

const expensesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: String,
    required: true,
  },
  expenses: {
    type: Number,
  },
});

export default mongoose.model('Expenses', expensesSchema);

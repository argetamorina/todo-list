import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Todo', schema);

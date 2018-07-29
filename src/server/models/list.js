import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  todos: []
});

export default mongoose.model('List', schema);

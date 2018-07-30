import mongoose from 'mongoose';

const validateEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', schema);

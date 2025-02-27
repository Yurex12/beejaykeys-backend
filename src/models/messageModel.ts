import { model, Schema } from 'mongoose';

const messageModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default model('Message', messageModel);

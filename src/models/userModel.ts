import { model, Schema } from 'mongoose';

const userModel = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email already exists.'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('User', userModel);

import { model, Schema } from 'mongoose';

const linkModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['x', 'instagram', 'telegram'],
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default model('Link', linkModel);

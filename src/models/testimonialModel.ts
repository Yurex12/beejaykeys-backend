import { model, Schema } from 'mongoose';

const testimonialModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      enum: ['red', 'yellow', 'gray'],
    },
  },
  { timestamps: true }
);

export default model('Testimonial', testimonialModel);

import { model, Schema } from 'mongoose';

const faqModel = new Schema(
  {
    question: {
      type: String,
      required: true,
      unique: [true, 'Question already exists.'],
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Faq', faqModel);

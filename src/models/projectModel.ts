import { model, Schema } from 'mongoose';

const projectModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    workedAs: {
      type: [{ id: String, name: String, className: String }],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['done', 'in-progress'],
    },
    pitch: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model('Project', projectModel);

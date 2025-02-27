import { model, Schema } from 'mongoose';

const projectModel = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  workedAs: {
    type: String,
    required: true,
  },
  imageUrl: {
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
});

export default model('Project', projectModel);

import { model, Schema } from 'mongoose';

const serviceModel = new Schema(
  {
    skill: {
      type: String,
      required: true,
      enum: [
        'ambassadorship-&-influence',
        'project-marketing',
        'community-management',
      ],
    },
    description: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Service', serviceModel);

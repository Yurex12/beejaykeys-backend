import mongoose, { Schema } from 'mongoose';

const viewsModel = new Schema({
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  uniqueIpAddress: { type: [String] },
  dailyViews: [
    {
      date: { type: Date, default: () => new Date() },
      views: { type: Number, default: 0 },
    },
  ],
});

export default mongoose.model('View', viewsModel);

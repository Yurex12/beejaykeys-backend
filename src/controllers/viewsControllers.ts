import { NextFunction, Response, Request } from 'express';
import expressAsyncHandler from 'express-async-handler';

import View from '../models/viewsModel';
import { StatusCodes } from 'http-status-codes';
import {
  eachDayOfInterval,
  isSameDay,
  startOfDay,
  subDays,
  format,
} from 'date-fns';

export const updateViews = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: viewId } = req.params as RequestParams;
    const { ipAddress } = req.body;
    const view = await View.findById(viewId);

    if (!view) {
      res.status(StatusCodes.NO_CONTENT);
      throw new Error('Something went wrong');
    }

    // Track unique visitors
    if (!view.uniqueIpAddress.includes(ipAddress)) {
      view.uniqueIpAddress.push(ipAddress);
      view.uniqueVisitors += 1;
    }

    const today = startOfDay(new Date());
    const lastEntry = view.dailyViews.at(-1);

    if (lastEntry && isSameDay(startOfDay(lastEntry.date), today)) {
      lastEntry.views += 1;
    } else {
      view.dailyViews.push({ views: 1 });
    }

    await view.save();

    res.status(StatusCodes.OK).json(view);
  }
);

export const getViews = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: viewId } = req.params as RequestParams;

    const view = await View.findById(viewId);

    if (!view) {
      res.status(StatusCodes.NO_CONTENT);
      throw new Error('Something went wrong');
    }

    // Get last 30 days
    const endDate = new Date();
    const startDate = subDays(endDate, 29);

    // Generate all dates
    const allDates = eachDayOfInterval({ start: startDate, end: endDate }).map(
      (date) => ({
        date: format(date, 'yyyy-MM-dd'), // Consistent date format
        views: 0, // Default to 0 views
      })
    );

    // Merge existing data
    const filledData = allDates.map((day) => {
      const existingEntry = view.dailyViews.find(
        (entry) => format(entry.date, 'yyyy-MM-dd') === day.date
      );
      return {
        ...day,
        views: existingEntry ? existingEntry.views : 0,
        dayName: format(new Date(day.date), 'EEEE'),
      };
    });

    const viewObject = view.toObject();
    res.status(StatusCodes.OK).json({ ...viewObject, dailyViews: filledData });
  }
);

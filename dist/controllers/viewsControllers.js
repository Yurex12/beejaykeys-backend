"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViews = exports.updateViews = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const viewsModel_1 = __importDefault(require("../models/viewsModel"));
const http_status_codes_1 = require("http-status-codes");
const date_fns_1 = require("date-fns");
exports.updateViews = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: viewId } = req.params;
    const { ipAddress } = req.body;
    const view = yield viewsModel_1.default.findById(viewId);
    if (!view) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT);
        throw new Error('Something went wrong');
    }
    // Track unique visitors
    if (!view.uniqueIpAddress.includes(ipAddress)) {
        view.uniqueIpAddress.push(ipAddress);
        view.uniqueVisitors += 1;
    }
    const today = (0, date_fns_1.startOfDay)(new Date());
    const lastEntry = view.dailyViews.at(-1);
    if (lastEntry && (0, date_fns_1.isSameDay)((0, date_fns_1.startOfDay)(lastEntry.date), today)) {
        lastEntry.views += 1;
    }
    else {
        view.dailyViews.push({ views: 1 });
    }
    yield view.save();
    res.status(http_status_codes_1.StatusCodes.OK).json(view);
}));
exports.getViews = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: viewId } = req.params;
    const view = yield viewsModel_1.default.findById(viewId);
    if (!view) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT);
        throw new Error('Something went wrong');
    }
    // Get last 30 days
    const endDate = new Date();
    const startDate = (0, date_fns_1.subDays)(endDate, 29);
    // Generate all dates
    const allDates = (0, date_fns_1.eachDayOfInterval)({ start: startDate, end: endDate }).map((date) => ({
        date: (0, date_fns_1.format)(date, 'yyyy-MM-dd'), // Consistent date format
        views: 0, // Default to 0 views
    }));
    // Merge existing data
    const filledData = allDates.map((day) => {
        const existingEntry = view.dailyViews.find((entry) => (0, date_fns_1.format)(entry.date, 'yyyy-MM-dd') === day.date);
        return Object.assign(Object.assign({}, day), { views: existingEntry ? existingEntry.views : 0, dayName: (0, date_fns_1.format)(new Date(day.date), 'EEEE') });
    });
    const viewObject = view.toObject();
    res.status(http_status_codes_1.StatusCodes.OK).json(Object.assign(Object.assign({}, viewObject), { dailyViews: filledData }));
}));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const db_1 = require("./config/db");
const errorHandler_1 = require("./middlewares/errorHandler");
const faqRoutes_1 = __importDefault(require("./routes/faqRoutes"));
const linkRoutes_1 = __importDefault(require("./routes/linkRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const testimonialRoutes_1 = __importDefault(require("./routes/testimonialRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const viewsRoutes_1 = __importDefault(require("./routes/viewsRoutes"));
const storage = multer_1.default.memoryStorage();
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        console.log(req.file);
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
});
const PORT = process.env.PORT || 9000;
const app = (0, express_1.default)();
// cors
app.use((0, cors_1.default)({
    origin: process.env.WEBSITE_URI,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(upload.single('image'));
app.use((0, cookie_parser_1.default)());
// Routes middleware
app.use('/api/users', userRoutes_1.default);
app.use('/api/faqs', faqRoutes_1.default);
app.use('/api/links', linkRoutes_1.default);
app.use('/api/testimonials', testimonialRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/stats', viewsRoutes_1.default);
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
// connect to the database
(0, db_1.connectDB)();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

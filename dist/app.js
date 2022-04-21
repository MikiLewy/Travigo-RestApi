"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const destinations_1 = __importDefault(require("./routes/destinations"));
const schedule_1 = __importDefault(require("./routes/schedule"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, '..', 'images'));
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(body_parser_1.default.json());
app.use((0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '..', 'images')));
app.use(destinations_1.default);
app.use('/schedule', schedule_1.default);
app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message });
});
mongoose_1.default
    .connect('mongodb+srv://mikolaj:bazaNode@cluster0.baoax.mongodb.net/travigo?retryWrites=true&w=majority')
    .then((result) => {
    app.listen(8080);
})
    .catch((err) => console.log(err));

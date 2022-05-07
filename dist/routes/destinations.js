"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destinations_1 = require("../controllers/destinations");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const router = (0, express_1.Router)();
router.get('/destinations', isAuth_1.default, destinations_1.getDestinations);
router.get('/destination/:id', isAuth_1.default, destinations_1.getDestination);
router.get('/favorites', isAuth_1.default, destinations_1.getFavorites);
router.get('/favorites/:id', isAuth_1.default, destinations_1.addToFavorites);
router.delete('/favorites/:id', isAuth_1.default, destinations_1.deleteFromFavorites);
router.get('/top-destinations', isAuth_1.default, destinations_1.getTopDestinations);
exports.default = router;

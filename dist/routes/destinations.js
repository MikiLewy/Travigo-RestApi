"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destinations_1 = require("../controllers/destinations");
const router = (0, express_1.Router)();
router.get('/destinations', destinations_1.getDestinations);
router.get('/destination/:id', destinations_1.getDestination);
router.get('/top-destinations', destinations_1.getTopDestinations);
exports.default = router;

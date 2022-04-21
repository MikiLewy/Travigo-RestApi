"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destinations_1 = require("../controllers/destinations");
const router = (0, express_1.Router)();
router.get('/destinations', destinations_1.getDestinations);
router.get('/best-destinations', destinations_1.getBestDestinations);
exports.default = router;

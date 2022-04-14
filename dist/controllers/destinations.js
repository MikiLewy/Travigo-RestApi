"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDestination = exports.getBestDestinations = exports.getDestinations = void 0;
const getDestinations = (req, res, next) => {
    res.status(200).json({ message: 'Successfull fetched data', destinations: [{ id: new Date().toString(), title: 'First destination' }] });
};
exports.getDestinations = getDestinations;
const getBestDestinations = (req, res, next) => {
    res.status(200).json({ message: 'Successfull fetched data', destinations: [{ id: new Date().toString(), title: 'Best destination' }] });
};
exports.getBestDestinations = getBestDestinations;
const getDestination = (req, res, next) => {
    const destinationId = req.params.id;
};
exports.getDestination = getDestination;

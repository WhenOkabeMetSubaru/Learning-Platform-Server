"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI;
console.log(process.env.PORT);
const connectToMongo = () => {
    mongoose.connect(mongoUri).then(() => {
        console.log('connected to Mongo');
    });
};
exports.connectToMongo = connectToMongo;

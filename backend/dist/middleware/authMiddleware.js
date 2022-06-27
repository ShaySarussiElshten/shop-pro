"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectDownload = exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    var _a;
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '');
            req.user = await userModel_1.default.findById(decoded.id).select('-password');
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
exports.protect = protect;
const protectDownload = (0, express_async_handler_1.default)(async (req, res, next) => {
    var _a;
    let token;
    let orderId;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            orderId = req.params.id;
            const decoded = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '');
            const oredr = await orderModel_1.default.findById(orderId);
            if (!oredr)
                throw new Error('Not found, order');
            if (oredr.user.toString() !== decoded.id)
                throw new Error('Not match user');
            if (!oredr.isPaid)
                throw new Error('the order is not paid');
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error(error.message);
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
exports.protectDownload = protectDownload;
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};
exports.admin = admin;

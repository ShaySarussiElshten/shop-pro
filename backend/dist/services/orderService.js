"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = __importDefault(require("../models/orderModel"));
const uuid_1 = require("uuid");
const addOrder = async (orderItemsArr, orderInfo, totalPrice, userId) => {
    if (orderItemsArr && orderItemsArr.length === 0) {
        throw new Error('No order items');
    }
    else {
        let orderNum = (0, uuid_1.v4)();
        const order = new orderModel_1.default({
            orderItems: orderItemsArr,
            user: userId,
            orderNumber: orderNum.slice(orderNum.length - 6, orderNum.length - 1),
            orderInfo,
            totalPrice: Number(totalPrice),
        });
        const createdOrder = await order.save();
        return createdOrder;
    }
};
const getMyOrders = async (_end, _start, userId) => {
    if (!_end)
        _end = await orderModel_1.default.count({ user: userId });
    if (!_start)
        _start = 0;
    const recordes = _end - _start;
    if (recordes <= 0) {
        throw new Error('somthing went wrong with end & start');
    }
    const skiping = _start / recordes;
    const orders = await orderModel_1.default.find({ user: userId })
        .limit(recordes)
        .skip(skiping * recordes);
    const count = await orderModel_1.default.count({ user: userId });
    return { count, orders };
};
const updateOrderToPaid = async (paramId, id, status, update_time, payer) => {
    const order = await orderModel_1.default.findById(paramId);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id,
            status,
            update_time,
            email_address: payer.email_address,
        };
        const updatedOrder = await order.save();
        return updatedOrder;
    }
    else {
        throw new Error('Order not found');
    }
};
const getDownloadDetails = async (paramId) => {
    const order = await orderModel_1.default.findById(paramId);
    await order.populate('orderItems.product').execPopulate();
    const songLinks = [];
    for (let i = 0; i < order.orderItems.length; i++) {
        const versionName = order.orderItems[i].version;
        songLinks.push({
            link: order.orderItems[i].product.versions.find((version) => version.name === versionName).link,
            name: order.orderItems[i].name,
            version: order.orderItems[i].version,
            id: i + 1
        });
    }
    return songLinks;
};
exports.default = {
    addOrder,
    getMyOrders,
    updateOrderToPaid,
    getDownloadDetails
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateUser = exports.getUserById = exports.getUsers = exports.getUserProfile = exports.registerUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel_1.default.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id),
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
exports.authUser = authUser;
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await userModel_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});
exports.registerUser = registerUser;
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userModel_1.default.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});
exports.getUserProfile = getUserProfile;
// @desc    Get user profile
// @route   GET /api/users
// @access  Public
const getUsers = (0, express_async_handler_1.default)(async (req, res) => {
    let { _end, _order, _sort, _start, q } = req.query;
    if (!_end)
        _end = await userModel_1.default.count({});
    if (!_start)
        _start = '0';
    const recordes = Number(_end) - Number(_start);
    if (recordes <= 0) {
        res.status(404);
        throw new Error('somthing went wrong with end & start');
    }
    const skiping = Number(_start) / recordes;
    const users = await userModel_1.default.find({})
        .limit(recordes)
        .skip(skiping * recordes);
    const count = await userModel_1.default.count({});
    res.set('X-Total-Count', count);
    res.json(users);
});
exports.getUsers = getUsers;
// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Public
const getUserById = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userModel_1.default.findById(req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});
exports.getUserById = getUserById;
// @desc    update user by id
// @route   PUT /api/users/:id
// @access  Public
const updateUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, isAdmin } = req.body;
    const user = await userModel_1.default.findById(req.params.id);
    if (user) {
        user.name = name;
        user.email = email;
        user.isAdmin = isAdmin;
        const updatedUser = await user.save();
        res.json(updatedUser);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});
exports.updateUser = updateUser;
// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userModel_1.default.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});
exports.deleteProduct = deleteProduct;

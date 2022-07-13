"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userLogin = joi_1.default.object({
    email: joi_1.default
        .string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joi_1.default
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,}$'))
        .required()
});

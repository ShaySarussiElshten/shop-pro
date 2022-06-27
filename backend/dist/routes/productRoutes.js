"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.route('/')
    .get(productController_1.getProducts)
    .post(productController_1.createProduct);
router.route('/:id')
    .get(productController_1.getProductById)
    .put(productController_1.updateProduct)
    .delete(productController_1.deleteProduct);
router.route('/:id/updateimage')
    .patch(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.updateImage);
exports.default = router;

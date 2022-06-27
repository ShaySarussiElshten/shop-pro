"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const todos_1 = __importDefault(require("./routes/todos"));
const uploadImageRoutes_1 = __importDefault(require("./routes/uploadImageRoutes"));
const uploadSongsRoutes_1 = __importDefault(require("./routes/uploadSongsRoutes"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    exposedHeaders: 'X-Total-Count',
};
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
const _dir = path_1.default.resolve();
app.use('/assets', express_1.default.static(path_1.default.join(_dir, '/assets')));
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/products', productRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/upload/images', uploadImageRoutes_1.default);
app.use('/api/upload/songs', uploadSongsRoutes_1.default);
app.use('/todos', todos_1.default);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
app.use(errorMiddleware_1.notFoundRoutes);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

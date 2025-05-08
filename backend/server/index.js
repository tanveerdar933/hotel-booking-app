"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const PORT = 8000;
const isOnNetlify = true;
mongoose_1.default
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log("MongoDB connection established successfully!"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json()); //help convert every req body into json
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
if (!isOnNetlify) {
    app.listen(PORT, () => {
        console.log("Server is running on localhost:", PORT);
    });
}
exports.handler = (0, serverless_http_1.default)(app);

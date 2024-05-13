"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const mock_routes_1 = __importDefault(require("./routes/mock.routes"));
const question_routes_1 = __importDefault(require("./routes/question.routes"));
const bundle_routes_1 = __importDefault(require("./routes/bundle.routes"));
const answered_routes_1 = __importDefault(require("./routes/answered.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const db_1 = require("./db");
(0, db_1.connectToMongo)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/api', user_routes_1.default);
app.use('/api', mock_routes_1.default);
app.use('/api', question_routes_1.default);
app.use('/api', bundle_routes_1.default);
app.use('/api', answered_routes_1.default);
app.use('/api', category_routes_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(` Server is running at http://localhost:${port}`);
});
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/user.routes'
import mockRoutes from './routes/mock.routes';
import questionRoutes from './routes/question.routes';
import bundleRoutes from './routes/bundle.routes';
import answeredRoutes from './routes/answered.routes';
import categoryRoutes from './routes/category.routes'

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')




import { connectToMongo } from './db'
connectToMongo();


const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', mockRoutes);
app.use('/api', questionRoutes);
app.use('/api', bundleRoutes);
app.use('/api', answeredRoutes);
app.use('/api',categoryRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './utils/connenctDB.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import companyRouter from './routers/companyRouter.js';
import reviewRouter from './routers/reviewRouter.js';
import reportRouter from './routers/reportRouter.js';
import logRouter from './routers/logRouter.js';
import messageRouter from './routers/messageRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.options('*', cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/companies', companyRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/reports', reportRouter);
app.use('/api/logs', logRouter);
app.use('/api/messages', messageRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

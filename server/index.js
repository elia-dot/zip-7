import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './utils/connenctDB.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import companyRouter from './routers/companyRouter.js';
import reviewRouter from './routers/reviewRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());

connectDB()

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/companies', companyRouter);
app.use('/api/reviews', reviewRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

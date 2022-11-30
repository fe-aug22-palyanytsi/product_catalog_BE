import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import { router as productRouter } from './routes/products';

const API_SUBPATH = '/.netlify/functions/server';

const app = express();

app.use(cors());

app.use(`${API_SUBPATH}/products`, productRouter);

export const handler = serverless(app);

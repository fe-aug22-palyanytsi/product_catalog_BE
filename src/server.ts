import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';

import { router as productRouter } from './routes/products';

const API_SUBPATH = '/.netlify/functions/server';

const app = express();

app.use(cors());

// Deveolp
// app.use('/products', productRouter);
// app.listen(6000, () => {
//   console.log('Server started at http://localhost:6000');
// });

// Product
app.use(`${API_SUBPATH}/products`, productRouter);

export const handler = serverless(app);

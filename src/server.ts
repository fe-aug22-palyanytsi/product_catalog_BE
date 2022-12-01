import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { router as productRouter } from './routes/products';

const API_SUBPATH = '/.netlify/functions/server';

const app = express();

app.use(cors());

// Deveolp
// app.use('/products', productRouter);
// app.listen(5000, () => {
//   console.log('Server started at http://localhost:5000');
// });

// Product
app.use(`${API_SUBPATH}/static`, express.static(path.resolve('src', 'static')));
app.use(`${API_SUBPATH}/products`, productRouter);

export const handler = serverless(app);

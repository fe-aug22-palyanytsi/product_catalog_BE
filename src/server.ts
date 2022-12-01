import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { router as productRouter } from './routes/products';

const API_SUBPATH = '/.netlify/functions/server';

const app = express();

app.use(cors());
app.use(express.static(path.resolve('src', 'static')));

// Deveolp
// app.use('/products', productRouter);
// app.listen(5000, () => {
//   console.log('Server started at http://localhost:5000');
// });

// Product
app.use(`${API_SUBPATH}/products`, productRouter);
app.use('/imgtest', (req, res) => {
  res.sendFile(path.resolve('src', 'static', 'img', '04.jpg'));
});

export const handler = serverless(app);

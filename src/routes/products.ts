import express from 'express';

import * as productsController from '../controllers/products';

export const router = express.Router();

router.get('/', productsController.getAll);
router.get('/discount', productsController.getDiscout);
router.get('/new', productsController.getNew);
router.get('/:productId', productsController.getSingle);
router.get('/:productId/recommended', productsController.getRecommended);

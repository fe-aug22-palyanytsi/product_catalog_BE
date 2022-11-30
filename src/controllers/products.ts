import { Request, Response } from 'express';
import * as productsServices from '../services/products';
import { SortType } from '../types/SortType';

export const getAll = async (req: Request, res: Response) => {
  const sort = req.query.sort as SortType || SortType.Newest;

  const products = await productsServices.getAllByQuery(
    sort.toLowerCase() as SortType,
  );

  res.send(products);
};

export const getSingle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await productsServices.getSingleById(productId);

    res.send(product);
  } catch (error) {
    res.sendStatus(404);
  }
};

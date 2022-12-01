import { Request, Response } from 'express';
import * as productsServices from '../services/products';
import { SortType } from '../types/SortType';
import { PerPageType } from '../types/PerPageType';

export const getAll = async (req: Request, res: Response) => {
  const sort = req.query.sort as SortType || SortType.Newest;
  const perPage = req.query.perPage as PerPageType || PerPageType.All;
  const page = Number(req.query.page) || 1;

  const productsData = await productsServices.getAllByQuery(
    sort.toLowerCase() as SortType,
    page,
    perPage,
  );

  res.send(productsData);
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

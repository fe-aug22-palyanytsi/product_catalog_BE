import fs from 'fs/promises';
import { SortType } from '../types/SortType';
import { Product } from '../types/Product';

const ALL_PHONES_PATH = 'src/data/phones.json';
const EXTENSIVE_PHONES_PATH = 'src/data/phones/';

const read = async (path: string): Promise<Product[] | null> => {
  const products = await fs.readFile(path, 'utf-8');

  return JSON.parse(products);
};

export const getAllByQuery = async (sort: SortType) => {
  const products = await read(ALL_PHONES_PATH);

  if (!products) {
    return null;
  }

  return [...products].sort((prevProduct, currProduct) => {
    switch (sort) {
      case SortType.Newest:
        return currProduct.year - prevProduct.year;

      case SortType.Alphabetically:
        return prevProduct.name.localeCompare(currProduct.name);

      case SortType.Cheapest:
        return prevProduct.price - currProduct.price;

      case SortType.Expensive:
        return currProduct.price - prevProduct.price;

      default:
        return 0;
    }
  });
};

export const getSingleById = async (productId: string) => {
  const product = await read(`${EXTENSIVE_PHONES_PATH}${productId}.json`);

  return product;
};

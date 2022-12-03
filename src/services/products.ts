import fs from 'fs/promises';
import { SortType } from '../types/SortType';
import { Product } from '../types/Product';
import { PerPageType } from '../types/PerPageType';

const ALL_PHONES_PATH = 'src/data/phones.json';
const EXTENSIVE_PHONES_PATH = 'src/data/phones/';

const read = async (path: string): Promise<Product[] | null> => {
  const products = await fs.readFile(path, 'utf-8');

  return JSON.parse(products);
};

export const getAllByQuery = async (
  sort: SortType,
  page = 1,
  perPage: PerPageType = PerPageType.All,
) => {
  let products = await read(ALL_PHONES_PATH);
  const productsLength = products?.length;

  if (!products) {
    return null;
  }

  products = [...products].sort((prevProduct, currProduct) => {
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

  if (perPage !== PerPageType.All) {
    const numberPerPage = +perPage;
    const startIndex = (page - 1) * numberPerPage;
    const possibleEndIndex = startIndex + numberPerPage;
    const endIndex = possibleEndIndex > products.length
      ? products.length
      : possibleEndIndex;

    products = products.slice(startIndex, endIndex);
  }

  return {
    phones: products,
    length: productsLength,
  };
};

export const getSingleById = async (productId: string) => {
  const product = await read(`${EXTENSIVE_PHONES_PATH}${productId}.json`);

  return product;
};

export const getNewest = async () => {
  const products = await read(ALL_PHONES_PATH);

  if (products?.length) {
    return products.sort((prevProduct, currProduct) => (
      currProduct.year - prevProduct.year
    )).slice(0, 10);
  }

  return null;
};

export const getBiggestDiscount = async () => {
  const products = await read(ALL_PHONES_PATH);

  if (products?.length) {
    return products.sort((prevProduct, currProduct) => {
      const currProductDiscount = (currProduct.fullPrice - currProduct.price);
      const prevProductDiscount = (prevProduct.fullPrice - prevProduct.price);

      return currProductDiscount - prevProductDiscount;
    }).slice(0, 10);
  }

  return null;
};

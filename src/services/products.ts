import fs from 'fs/promises';
import { SortType } from '../types/SortType';
import { Product } from '../types/Product';
import { PerPageType } from '../types/PerPageType';

const ALL_PHONES_PATH = 'src/data/product.json';
const EXTENSIVE_PHONES_PATH = 'src/data/phones/';
const EXTENSIVE_TABLETS_PATH = 'src/data/tablets/';

const read = async (path: string): Promise<Product[] | null> => {
  const products = await fs.readFile(path, 'utf-8');

  return JSON.parse(products);
};

const sortFunction = (products: Product[], sortType: SortType) => {
  return [...products].sort((prevProduct, currProduct) => {
    switch (sortType) {
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

const paginationFunction = (
  products: Product[],
  page: number,
  perPage: PerPageType,
) => {
  const numberPerPage = +perPage;
  const startIndex = (page - 1) * numberPerPage;
  const possibleEndIndex = startIndex + numberPerPage;
  const endIndex = possibleEndIndex > products.length
    ? products.length
    : possibleEndIndex;

  return products.slice(startIndex, endIndex);
};

export const getAllByQuery = async (
  sort: SortType,
  page = 1,
  perPage: PerPageType = PerPageType.All,
) => {
  const products = await read(ALL_PHONES_PATH);
  let phones = products?.filter(product => product.category === 'phones');
  let tablets = products?.filter(product => product.category === 'tablets');
  const phonesLength = phones?.length;
  const tabletsLength = tablets?.length;
  const productLength = products?.length;

  if (!products) {
    return null;
  }

  if (phones) {
    phones = sortFunction(phones, sort);

    if (perPage !== PerPageType.All) {
      phones = paginationFunction(phones, page, perPage);
    }
  }

  if (tablets) {
    tablets = sortFunction(tablets, sort);

    if (perPage !== PerPageType.All) {
      tablets = paginationFunction(tablets, page, perPage);
    }
  }

  return {
    phones,
    phonesLength,
    tablets,
    tabletsLength,
    length: productLength,
  };
};

export const getSingleById = async (productId: string) => {
  let path = '';

  if (productId.includes('iphone')) {
    path = `${EXTENSIVE_PHONES_PATH}${productId}.json`;
  } else if (productId.includes('ipad')) {
    path = `${EXTENSIVE_TABLETS_PATH}${productId}.json`;
  }

  const product = await read(path);

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

export const getRecommendedProducts = async () => {
  const products = await read(ALL_PHONES_PATH);

  if (!products?.length) {
    return null;
  }

  return products.sort(() => 0.5 - Math.random()).slice(0, 10);
};

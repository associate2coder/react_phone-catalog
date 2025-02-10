import { paginationBaseQuantity } from '../../../config/constants';

export const calculatePaginationSlice = (
  length: number,
  perPage: number,
  page: number,
) => {
  const pages = Math.ceil(length / perPage);

  if (page > pages) {
    return [0, perPage];
  }

  const start = (page - 1) * perPage;
  const end = Math.min(length, page * perPage);

  return [start, end];
};

export const createPaginationRange = (
  length: number,
  startValue: number = 0,
) => {
  return Array.from({ length: length }, (_, i) => i + startValue + 1);
};

export const calculateCurrentRange = (
  pageCount: number,
  currentPage: number,
) => {
  if (pageCount < paginationBaseQuantity) {
    return createPaginationRange(pageCount).map(String);
  }

  const pages = new Set<number>(
    [1, currentPage - 1, currentPage, currentPage + 1, pageCount].filter(
      num => num >= 1 && num <= pageCount,
    ),
  );

  return Array.from(pages)
    .sort((a, b) => a - b)
    .reduce((acc, page, index, arr) => {
      if (index > 0) {
        const prevPage = arr[index - 1];

        if (page - prevPage === 2) {
          acc.push(`${prevPage + 1}`);
        } else if (page - prevPage > 2) {
          acc.push('...');
        }
      }

      acc.push(`${page}`);

      return acc;
    }, new Array<string>());
};

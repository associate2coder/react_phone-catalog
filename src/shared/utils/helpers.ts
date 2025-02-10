export const capitalize = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.substring(1).toLowerCase()}`;
};

export const normalizeForUrl = (str: string) => {
  return str.toLowerCase().replaceAll(' ', '-');
};

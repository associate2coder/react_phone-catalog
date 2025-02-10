import { Product } from '../shared/types/Product';
import { ProductDetails } from '../shared/types/ProductDetails';

export const cardSpecs: Array<keyof Product> = ['screen', 'capacity', 'ram'];

export const keySpecs: Array<keyof ProductDetails> = [
  'screen',
  'resolution',
  'processor',
  'ram',
];

export const techSpecs: Array<keyof ProductDetails> = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
];

export const specsTitle = {
  screen: 'Screen',
  resolution: 'Resolution',
  processor: 'Processor',
  ram: 'RAM',
  capacity: 'Build in memory',
  camera: 'Camera',
  zoom: 'Zoom',
  cell: 'Cell',
};

export const textSettingsClass = {
  ProductCard: 'productCardText',
  ProductPage: 'productPageText',
};

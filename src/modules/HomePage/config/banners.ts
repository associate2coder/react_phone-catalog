import { Banner } from '../types/Banner';

export const banners: Banner[] = [
  {
    id: 'title-banner',
    order: 0,
    mobile: 'img/base-banner-mobile.png',
    tablet: 'img/base-banner-tablet.png',
    desktop: 'img/base-banner-desktop.png',
    href: '/phones?query=iphone+14+pro',
  },
  {
    id: 'phones-banner',
    order: 1,
    mobile: 'img/banner-phones-mobile.png',
    tablet: 'img/banner-phones-tablet.png',
    desktop: 'img/banner-phones-desktop.png',
    href: '/phones',
  },
  {
    id: 'tablets-banner',
    order: 2,
    mobile: 'img/banner-tablets-mobile.png',
    tablet: 'img/banner-tablets-tablet.png',
    desktop: 'img/banner-tablets-desktop.png',
    href: '/tablets',
  },
  {
    id: 'accessories-banner',
    order: 3,
    mobile: 'img/banner-accessories-mobile.png',
    tablet: 'img/banner-accessories-tablet.png',
    desktop: 'img/banner-accessories-desktop.png',
    href: '/accessories',
  },
];

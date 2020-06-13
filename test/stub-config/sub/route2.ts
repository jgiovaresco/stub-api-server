import { RouteConfig } from '../../../src';

export const configRoute2a: RouteConfig = {
  method: 'GET',
  path: '/a/route2/a',
  template: { message: 'route2a' },
};

export const configRoute2b: RouteConfig = {
  method: 'GET',
  path: '/a/route2/b',
  template: { message: 'route2b' },
};

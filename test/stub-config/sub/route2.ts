import { RouteConfig } from '../../../src';

const configRoute2a: RouteConfig = {
  method: 'GET',
  path: '/a/route2/a',
  template: { message: 'route2a' },
};
const configRoute2b: RouteConfig = {
  method: 'GET',
  path: '/a/route2/b',
  template: { message: 'route2b' },
};

export default [configRoute2a, configRoute2b];

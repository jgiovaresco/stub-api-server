// routes/route.ts
import { RouteConfig } from '../../../src';

export const helloRoute: RouteConfig = {
  method: 'GET',
  path: '/hello',
  template: { message: 'Hello World' },
};

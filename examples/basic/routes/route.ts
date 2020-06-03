// routes/route.ts
import { RouteConfig } from '../../../src';

const route: RouteConfig = {
  method: 'GET',
  path: '/hello',
  template: { message: 'Hello World' },
};

export default route;

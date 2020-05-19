import { RouteConfig } from '../../src/route-config';

export function newRouteConfig(config: Partial<RouteConfig>): RouteConfig {
  const base: RouteConfig = {
    method: 'GET',
    path: '/hello',
    template: { message: 'Hello World' },
  };

  return { ...base, ...config };
}

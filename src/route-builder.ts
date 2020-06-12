/* eslint-disable @typescript-eslint/no-use-before-define */

import { ResponseGenerator } from './response-generator';
import { Route, RouteConfig } from './route-config';

export function buildFromRouteConfig(routes: RouteConfig[]): Route[] {
  return routes.map(route => routerFromConfig(route));
}

function routerFromConfig(config: RouteConfig): Route {
  const generator = new ResponseGenerator(config);

  return {
    method: config.method,
    path: config.path,
    handler: context => {
      return generator.generate(context);
    },
  };
}

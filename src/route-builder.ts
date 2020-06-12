/* eslint-disable @typescript-eslint/no-use-before-define */

import { ResponseGenerator } from './response-generator';
import { RequestContext, ResponseGenerated, RouteConfig } from './route-config';

export type Route = {
  method: string;
  path: string;
  handler: (context: RequestContext<unknown>) => Promise<ResponseGenerated>;
};

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

/* eslint-disable @typescript-eslint/no-use-before-define */

import { RequestContext, RouteConfig } from './route-config';
import { processBody, processStatus } from './processors';

export type Route = {
  method: string;
  path: string;
  handler: (context: RequestContext<unknown>) => Promise<ResponseGenerated>;
};
export type ResponseGenerated = {
  status: number;
  body: unknown;
};

export function buildFromRouteConfig(routes: RouteConfig[]): Route[] {
  return routes.map(route => routerFromConfig(route));
}

function routerFromConfig(config: RouteConfig): Route {
  return {
    method: config.method,
    path: config.path,
    handler: context => generate(config, context),
  };
}

async function generate(
  config: RouteConfig,
  context: RequestContext<unknown>,
): Promise<ResponseGenerated> {
  return {
    status: processStatus(config, context),
    body: await processBody(config, context),
  };
}

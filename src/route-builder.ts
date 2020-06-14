/* eslint-disable @typescript-eslint/no-use-before-define */
import globby from 'globby';

import { RequestContext, RouteConfig } from './route-config';
import { processBody, processStatus } from './processors';
import { isNil, isString } from 'lodash';

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

export async function buildFromDirectory(path: string): Promise<Route[]> {
  const files = await globby(path);

  return (await Promise.all(files.map(f => import(f))))
    // Get all values exported via `export const XXX =`
    .flatMap(exports => Object.values(exports))
    .filter(isValidRouteConfig)
    .map(route => routerFromConfig(route))
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

function isValidRouteConfig(input: any): input is RouteConfig {
  if(isString(input.method) && isString(input.path) && !isNil(input.template)) {
    return true;
  }

  return  false;
}

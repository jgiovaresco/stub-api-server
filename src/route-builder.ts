/* eslint-disable @typescript-eslint/no-use-before-define */
import Bluebird from 'bluebird';
import globby from 'globby';
import { has } from 'lodash';

import { ResponseGenerator } from './response-generator';
import { Route, RouteConfig } from './route-config';

export function buildFromRouteConfig(routes: RouteConfig[]): Route[] {
  return routes.map(route => routerFromConfig(route));
}

export async function buildFromDirectory(path: string): Promise<Route[]> {
  const files = await globby(path);

  return Bluebird.map(files, f => import(f))
    .filter(def => has(def, 'default'))
    .map(def => {
      if (Array.isArray(def.default)) {
        return buildFromRouteConfig(def.default);
      }
      return routerFromConfig(def.default);
    })
    .reduce((prev: Route[], cur) => prev.concat(cur), []);
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

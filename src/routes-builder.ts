/* eslint-disable @typescript-eslint/no-use-before-define */
import Bluebird from 'bluebird';
import globby from 'globby';
import Router from 'koa-router';
import { has } from 'lodash';

export type RouteConfig = {
  method: string;
  path: string;
  template: unknown;
};

export function buildFromRouteConfig(routes: RouteConfig[]) {
  return routes.map(route => routerFromConfig(route).routes());
}

export async function buildFromDirectory(path: string) {
  const files = await globby(path);

  return Bluebird.map(files, f => import(f))
    .filter(def => has(def, 'default'))
    .map(def => routerFromConfig(def.default).routes());
}

function routerFromConfig(config: RouteConfig) {
  const router = new Router({ methods: [config.method] });
  router.all(config.path, ctx => {
    ctx.status = 200;
    ctx.body = config.template;
  });
  return router;
}

/* eslint-disable @typescript-eslint/no-use-before-define */
import Router from 'koa-router';

export type RouteConfig = {
  method: string;
  path: string;
  template: unknown;
};

export function buildFromRouteConfig(routes: RouteConfig[]) {
  return routes.map(route => routerFromConfig(route).routes());
}

function routerFromConfig(config: RouteConfig) {
  const router = new Router({ methods: [config.method] });
  router.all(config.path, ctx => {
    ctx.status = 200;
    ctx.body = config.template;
  });
  return router;
}

import { Server } from '@hapi/hapi';
import { notImplemented } from '@hapi/boom';
import Bluebird from 'bluebird';

import { Route, RouteConfig } from './route-config';
import { buildFromDirectory, buildFromRouteConfig } from './route-builder';

export type StubApiServerOptions = {
  port?: number;
};

const UNMATCHED_ROUTE = {
  method: '*',
  path: '/{any*}',
  handler: function () {
    throw notImplemented();
  },
};

export class StubApiServer {
  private readonly app: Server;

  constructor(private readonly options?: StubApiServerOptions) {
    this.app = new Server({ port: this.options?.port });
    this.app.route(UNMATCHED_ROUTE);
  }

  public useRoutes(routes: RouteConfig[]) {
    buildFromRouteConfig(routes).map(r => this.addRoute(r));
    return this;
  }

  public async useRoutesFromDir(path: string) {
    await Bluebird.resolve()
      .then(() => buildFromDirectory(path))
      .map(r => this.addRoute(r));
    return this;
  }

  public async start() {
    await this.app.start();
  }

  public stop() {
    return this.app.stop();
  }

  public listeningUrl() {
    return `http://localhost:${this.app.info.port}`;
  }

  private addRoute(r: Route) {
    this.app.route({
      method: r.method,
      path: r.path,
      handler: async (request, h) => {
        const res = await r.handler({
          params: request.params,
          query: request.query,
          payload: request.payload,
          url: request.url.toString()
        });
        return h.response(res.body as object).code(res.status);
      },
    });
  }
}

import { Server, createServer } from 'http';

import Koa, { ExtendableContext } from 'koa';
import { isNil } from 'lodash';
import { getPortPromise } from 'portfinder';

import { buildFromDirectory, buildFromRouteConfig } from './route-builder';
import { RouteConfig } from './route-config';

export type StubApiServerOptions = {
  port?: number;
};

const UNMATCHED_ROUTE_MIDDLEWARE = (ctx: ExtendableContext) => {
  ctx.status = 501;
};

export class StubApiServer {
  private port?: number;
  private server?: Server;
  private readonly app: Koa;

  constructor(private readonly options?: StubApiServerOptions) {
    this.app = new Koa();
  }

  public useRoutes(routes: RouteConfig[]) {
    [...buildFromRouteConfig(routes), UNMATCHED_ROUTE_MIDDLEWARE].map(r =>
      this.app.use(r),
    );
    return this;
  }

  public async useRoutesFromDir(path: string) {
    const routes = await buildFromDirectory(path);
    [...routes, UNMATCHED_ROUTE_MIDDLEWARE].map(r => this.app.use(r));
    return this;
  }

  public async start() {
    this.port = this.options?.port;
    if (isNil(this.port)) {
      this.port = await getPortPromise();
    }
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this.server = createServer(this.app.callback());
      this.server.listen(this.port, resolve).on('error', reject);
    });
  }

  public stop() {
    return new Promise((resolve, reject) => {
      if (isNil(this.server)) {
        return resolve();
      }

      this.server.close(err => {
        if (!isNil(err)) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  public listeningUrl() {
    return `http://localhost:${this.port}`;
  }
}

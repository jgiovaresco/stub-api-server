import { Server, createServer } from 'http';

import Koa from 'koa';
import { isNil } from 'lodash';
import { getPortPromise } from 'portfinder';

export type StubApiServerOptions = {
  port?: number;
};

export class StubApiServer {
  private port?: number;
  private server?: Server;
  private readonly app: Koa;

  constructor(private readonly options?: StubApiServerOptions) {
    this.app = new Koa();

    this.app.use(ctx => {
      ctx.status = 501;
    });
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

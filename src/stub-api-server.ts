import { Server, createServer } from 'http';

import Koa from 'koa';
import { isNil } from 'lodash';

export type StubApiServerOptions = {
  port: number;
};

export class StubApiServer {
  private server?: Server;
  private readonly app: Koa;

  constructor(private readonly options: StubApiServerOptions) {
    this.app = new Koa();
  }

  public start() {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this.server = createServer(this.app.callback());
      this.server.listen(this.options.port, resolve).on('error', reject);
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
}

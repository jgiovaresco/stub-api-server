import { agent } from 'supertest';

import {
  CollectionRouteConfig,
  RequestQuery,
  RouteConfig,
  StubApiServer
} from '../../src';

type Config = RouteConfig | CollectionRouteConfig;

export class SUT {
  constructor(private readonly server = new StubApiServer()) {}

  public async start(routes: Config[] = []) {
    return this.server.useRoutes(routes).start();
  }

  public async stop() {
    return this.server.stop();
  }

  public async get(url: string, query: RequestQuery = {}) {
    return agent(this.server.listeningUrl()).get(url).query(query);
  }

  public async post(url: string, query: RequestQuery = {}, payload?: unknown) {
    return agent(this.server.listeningUrl())
      .post(url)
      .query(query)
      .send(payload as object);
  }

  public async put(url: string, query: RequestQuery = {}, payload?: unknown) {
    return agent(this.server.listeningUrl())
      .put(url)
      .query(query)
      .send(payload as object);
  }

  public async patch(url: string, query: RequestQuery = {}, payload?: unknown) {
    return agent(this.server.listeningUrl())
      .patch(url)
      .query(query)
      .send(payload as object);
  }
}

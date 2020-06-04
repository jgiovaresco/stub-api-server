import { agent } from 'supertest';

import { RouteConfig } from './route-config';
import { StubApiServer } from './stub-api-server';

describe('stub-api-server should', () => {
  let stub: StubApiServer;

  afterEach(async () => {
    if (stub) {
      await stub.stop();
    }
  });

  async function start(port?: number, routes: RouteConfig[] = []) {
    stub = new StubApiServer({ port }).useRoutes(routes);
    await stub.start();
  }

  it('by default responds 501 on all requests', async () => {
    await start();

    const response = await agent(stub.listeningUrl()).get('/');
    expect(response.status).toBe(501);
  });
});

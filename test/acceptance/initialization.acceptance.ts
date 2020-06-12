import { agent } from 'supertest';

import { RouteConfig, StubApiServer } from '../../src';

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

  it('start an http server using the provided port', async () => {
    await start(4444);

    const response = await agent(stub.listeningUrl()).get('/');
    expect(response.status).toBeNumber();
  });

  it('start an http server random port', async () => {
    await start();

    const response = await agent(stub.listeningUrl()).get('/');
    expect(response.status).toBeNumber();
  });

  it('load routes provided', async () => {
    const routes = [
      {
        method: 'GET',
        path: '/hello',
        template: { message: 'Hello World' },
      },
    ];
    await start(4444, routes);

    const response = await agent(stub.listeningUrl()).get('/hello');
    expect(response.status).toBe(200);
  });
});

import { agent } from 'supertest';

import { RouteConfig } from './routes-builder';
import { StubApiServer } from './stub-api-server';

describe('stub-api-server should', () => {
  let stub: StubApiServer;

  afterEach(async () => {
    await stub.stop();
  });

  async function start(
    port?: number,
    routes: RouteConfig[] = [],
  ) {
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

  it('by default responds 501 on all requests', async () => {
    await start();

    const response = await agent(stub.listeningUrl()).get('/');
    expect(response.status).toBe(501);
  });

  it('responds to a GET request configured', async () => {
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
    expect(response.body).toEqual({ message: 'Hello World' });
  });
});

import { agent } from 'supertest';

import {
  RequestContext,
  RequestQuery,
  RouteConfig,
  StubApiServer,
} from '../../src';

describe('stub-api-server should', () => {
  let stub: StubApiServer;

  type Body = { name: string };

  afterEach(async () => {
    if (stub) {
      await stub.stop();
    }
  });

  async function start(routes: RouteConfig[] = []) {
    stub = new StubApiServer().useRoutes(routes);
    await stub.start();
  }

  function get(url: string, query: RequestQuery = {}) {
    return agent(stub.listeningUrl()).get(url).query(query);
  }

  function post(url: string, query: RequestQuery = {}, payload?: Body) {
    return agent(stub.listeningUrl()).post(url).query(query).send(payload);
  }

  it('render a 501 response if no route match', async () => {
    await start([]);

    expect(await get('/hi')).toContainValue(501);
  });

  it('render a 200 response by default', async () => {
    const routes = [
      {
        method: 'GET',
        path: '/hi',
        template: true,
      },
    ];
    await start(routes);

    expect(await get('/hi')).toContainValue(200);
  });

  it('render the overridden status', async () => {
    const routes = [
      {
        method: 'GET',
        path: '/hi',
        status: () => 201,
        template: true,
      },
    ];
    await start(routes);

    expect(await get('/hi', { name: 'John' })).toContainValue(201);
  });

  it('render an overridden status using RequestContext', async () => {
    const routes = [
      {
        method: 'POST',
        path: '/hi/{gender}',
        status: <T extends Body>(ctx: RequestContext<unknown>) => {
          const payload = ctx.payload as Body;
          if (ctx.query?.name) return 201;
          if (payload?.name) return 202;
          if (ctx.params?.gender === 'a') return 203;
          return 200;
        },
        template: true,
      },
    ];
    await start(routes);

    expect(await post('/hi/none')).toContainValue(200);
    expect(await post('/hi/a', { name: 'John' })).toContainValue(201);
    expect(await post('/hi/a', {}, { name: 'John' })).toContainValue(202);
    expect(await post('/hi/a')).toContainValue(203);
  });
});

import { agent } from 'supertest';

import { RequestContext, RouteConfig, StubApiServer } from '../../src';

describe('stub-api-server should', () => {
  let stub: StubApiServer;

  afterEach(async () => {
    if (stub) {
      await stub.stop();
    }
  });

  async function start(routes: RouteConfig[] = []) {
    stub = new StubApiServer().useRoutes(routes);
    await stub.start();
  }

  type Body = { greetingWord: string };
  const template = {
    simple: 'Hello World',
    withRequestParam: (ctx: RequestContext<Body>) => ctx.params?.gender,
    func: (ctx: RequestContext<Body>) => `Hello ${ctx.query?.name}`,
    sub: {
      simple: 'Hello World',
      func: (ctx: RequestContext<Body>) =>
        `${ctx.payload ? ctx.payload.greetingWord : 'Hello'} ${
          ctx.query?.name
        }`,
    },
  };

  it('render GET template', async () => {
    const routes = [
      {
        method: 'GET',
        path: '/hello/{gender}',
        template,
      },
    ];
    await start(routes);

    const response = await agent(stub.listeningUrl()).get(
      '/hello/mr?name=John',
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      simple: 'Hello World',
      withRequestParam: 'mr',
      func: 'Hello John',
      sub: {
        simple: 'Hello World',
        func: 'Hello John',
      },
    });
  });

  it('render a POST template', async () => {
    const routes = [
      {
        method: 'POST',
        path: '/hello',
        template,
      },
    ];
    await start(routes);

    const response = await agent(stub.listeningUrl())
      .post('/hello?name=John')
      .send({ greetingWord: 'Bonjour' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      simple: 'Hello World',
      func: 'Hello John',
      sub: {
        simple: 'Hello World',
        func: 'Bonjour John',
      },
    });
  });

  it('render a PUT template', async () => {
    const routes = [
      {
        method: 'PUT',
        path: '/hello',
        template,
      },
    ];
    await start(routes);

    const response = await agent(stub.listeningUrl())
      .put('/hello?name=John')
      .send({ greetingWord: 'Bonjour' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      simple: 'Hello World',
      func: 'Hello John',
      sub: {
        simple: 'Hello World',
        func: 'Bonjour John',
      },
    });
  });

  it('render a PATCH template', async () => {
    const routes = [
      {
        method: 'PATCH',
        path: '/hello',
        template,
      },
    ];
    await start(routes);

    const response = await agent(stub.listeningUrl())
      .patch('/hello?name=John')
      .send({ greetingWord: 'Bonjour' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      simple: 'Hello World',
      func: 'Hello John',
      sub: {
        simple: 'Hello World',
        func: 'Bonjour John',
      },
    });
  });
});

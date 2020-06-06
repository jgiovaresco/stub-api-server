import { agent } from 'supertest';

import { RequestQuery, RouteConfig, StubApiServer } from '../../src';

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
    func: (q: RequestQuery) => `Hello ${q.name}`,
    sub: {
      simple: 'Hello World',
      func: (q: RequestQuery, b: Body) =>
        `${b ? b.greetingWord : 'Hello'} ${q.name}`,
    },
  };

  it('render GET template', async () => {
    const routes = [
      {
        method: 'GET',
        path: '/hello',
        template,
      },
    ];
    await start(routes);

    const response = await agent(stub.listeningUrl()).get('/hello?name=John');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      simple: 'Hello World',
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

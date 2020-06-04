import { agent } from 'supertest';

import { RouteConfig, StubApiServer } from '../../src';

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

  it('render GET template', async () => {
    type QueryParam = { name: string };

    const routes = [
      {
        method: 'GET',
        path: '/hello',
        template: {
          simple: 'Hello World',
          func: (q: QueryParam) => `Hello ${q.name}`,
          sub: {
            simple: 'Hello World',
            func: (q: QueryParam) => `Hello ${q.name}`,
          },
        },
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
      }
    });
  });

  it('render a POST template', async () => {
    type QueryParam = { name: string };
    type Body = { greetingWord: string };

    const routes = [
      {
        method: 'POST',
        path: '/hello',
        template: {
          simple: 'Hello World',
          func: (q: QueryParam) => `Hello ${q.name}`,
          sub: {
            simple: 'Hello World',
            func: (q: QueryParam, b: Body) => `${b.greetingWord} ${q.name}`,
          },
        },
      },
    ];
    await start(routes);

    const response = await agent(stub.listeningUrl()).post('/hello?name=John').send({
      greetingWord: 'Bonjour'
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({  simple: 'Hello World',
      func: 'Hello John',
      sub: {
        simple: 'Hello World',
        func: 'Bonjour John',
      } });
  });

  it('render a PUT template', async () => {
    type QueryParam = { name: string };
    type Body = { greetingWord: string };

    const routes = [
      {
        method: 'PUT',
        path: '/hello',
        template: {
          simple: 'Hello World',
          func: (q: QueryParam) => `Hello ${q.name}`,
          sub: {
            simple: 'Hello World',
            func: (q: QueryParam, b: Body) => `${b.greetingWord} ${q.name}`,
          },
        },
      },
    ];
    await start(routes);

    const response = await agent(stub.listeningUrl()).patch('/hello?name=John').send({
      greetingWord: 'Bonjour'
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({  simple: 'Hello World',
      func: 'Hello John',
      sub: {
        simple: 'Hello World',
        func: 'Bonjour John',
      } });
  });

  it('render a PATCH template', async () => {
    type QueryParam = { name: string };
    type Body = { greetingWord: string };

    const routes = [
      {
        method: 'PATCH',
        path: '/hello',
        template: {
          simple: 'Hello World',
          func: (q: QueryParam) => `Hello ${q.name}`,
          sub: {
            simple: 'Hello World',
            func: (q: QueryParam, b: Body) => `${b.greetingWord} ${q.name}`,
          },
        },
      },
    ];
    await start(routes);

    const response = await agent(stub.listeningUrl()).patch('/hello?name=John').send({
      greetingWord: 'Bonjour'
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({  simple: 'Hello World',
      func: 'Hello John',
      sub: {
        simple: 'Hello World',
        func: 'Bonjour John',
      } });
  });
});

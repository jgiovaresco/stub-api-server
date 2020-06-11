import Chance from 'chance';

import { RequestContext } from '../../src';
import { SUT } from './sut';

describe('stub-api-server should', () => {
  let sut: SUT;
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

  beforeEach(() => {
    sut = new SUT();
  });
  afterEach(() => sut.stop());

  describe('render simple template', () => {
    it('using GET request', async () => {
      const routes = [
        {
          method: 'GET',
          path: '/hello/{gender}',
          template,
        },
      ];
      await sut.start(routes);

      const response = await sut.get('/hello/mr', { name: 'John' });
      expect(response).toHaveBody({
        simple: 'Hello World',
        withRequestParam: 'mr',
        func: 'Hello John',
        sub: {
          simple: 'Hello World',
          func: 'Hello John',
        },
      });
    });

    it('using POST request', async () => {
      const routes = [
        {
          method: 'POST',
          path: '/hello',
          template,
        },
      ];
      await sut.start(routes);

      const response = await sut.post(
        '/hello',
        { name: 'John' },
        { greetingWord: 'Bonjour' },
      );
      expect(response).toHaveBody({
        simple: 'Hello World',
        func: 'Hello John',
        sub: {
          simple: 'Hello World',
          func: 'Bonjour John',
        },
      });
    });

    it('using PUT request', async () => {
      const routes = [
        {
          method: 'PUT',
          path: '/hello',
          template,
        },
      ];
      await sut.start(routes);

      const response = await sut.put(
        '/hello',
        { name: 'John' },
        { greetingWord: 'Bonjour' },
      );
      expect(response).toHaveBody({
        simple: 'Hello World',
        func: 'Hello John',
        sub: {
          simple: 'Hello World',
          func: 'Bonjour John',
        },
      });
    });

    it('using PATCH request', async () => {
      const routes = [
        {
          method: 'PATCH',
          path: '/hello',
          template,
        },
      ];
      await sut.start(routes);

      const response = await sut.patch(
        '/hello',
        { name: 'John' },
        { greetingWord: 'Bonjour' },
      );
      expect(response).toHaveBody({
        simple: 'Hello World',
        func: 'Hello John',
        sub: {
          simple: 'Hello World',
          func: 'Bonjour John',
        },
      });
    });
  });

  describe('render template with container', () => {
    it('using GET request', async () => {
      const routes = [
        {
          method: 'GET',
          path: '/hello/{gender}',
          container: {
            data: (ctx: RequestContext<Body>, data: unknown) => data,
          },
          template,
        },
      ];
      await sut.start(routes);

      const response = await sut.get('/hello/mr', { name: 'John' });
      expect(response).toHaveBody({
        data: {
          simple: 'Hello World',
          withRequestParam: 'mr',
          func: 'Hello John',
          sub: {
            simple: 'Hello World',
            func: 'Hello John',
          },
        },
      });
    });
  });

  describe('render collection template', () => {
    it('using fix number', async () => {
      const routes = [
        {
          method: 'GET',
          path: '/hello',
          collection: true,
          collectionSize: 2,
          template: {
            func: (ctx: RequestContext<Body>) => `Hello ${ctx.query?.name}`,
          },
        },
      ];
      await sut.start(routes);

      const response = await sut.get('/hello', { name: 'John' });
      expect(response).toHaveBody([
        { func: 'Hello John' },
        { func: 'Hello John' },
      ]);
    });

    it('using a function to generate the collection size', async () => {
      const routes = [
        {
          method: 'GET',
          path: '/hello',
          collection: true,
          collectionSize: (ctx: RequestContext<Body>) => ctx.query?.size,
          template: {
            func: (ctx: RequestContext<Body>) => `Hello ${ctx.query?.name}`,
          },
        },
      ];
      await sut.start(routes);

      const response = await sut.get('/hello', { name: 'John', size: '2' });
      expect(response).toHaveBody([
        { func: 'Hello John' },
        { func: 'Hello John' },
      ]);
    });
  });

  it('render cached response', async () => {
    const faker = new Chance();
    const routes = [
      {
        method: 'GET',
        path: '/hello',
        cache: true,
        template: {
          func: () => faker.natural(),
        },
      },
    ];
    await sut.start(routes);

    const response1 = await sut.get('/hello');
    const response2 = await sut.get('/hello');
    expect(response1.body).toEqual(response2.body);
  });
});

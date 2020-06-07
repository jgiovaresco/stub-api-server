import { RequestContext } from '../../src';
import { SUT } from './sut';

describe('stub-api-server should', () => {
  let sut: SUT;
  type Body = { name: string };

  beforeEach(() => {
    sut = new SUT();
  });
  afterEach(() => sut.stop());

  it('render a 501 response if no route match', async () => {
    await sut.start([]);

    expect(await sut.get('/hi')).toHaveStatus(501);
  });

  it('render a 200 response by default', async () => {
    const routes = [
      {
        method: 'GET',
        path: '/hi',
        template: true,
      },
    ];
    await sut.start(routes);

    expect(await sut.get('/hi')).toHaveStatus(200);
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
    await sut.start(routes);

    expect(await sut.get('/hi', { name: 'John' })).toHaveStatus(201);
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
    await sut.start(routes);

    expect(await sut.post('/hi/none')).toHaveStatus(200);
    expect(await sut.post('/hi/a', { name: 'John' })).toHaveStatus(201);
    expect(await sut.post('/hi/a', {}, { name: 'John' })).toHaveStatus(202);
    expect(await sut.post('/hi/a')).toHaveStatus(203);
  });
});

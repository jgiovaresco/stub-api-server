import { agent } from 'supertest';

import { StubApiServer } from './stub-api-server';

describe('stub-api-server should', () => {
  let stub: StubApiServer;

  afterEach(async () => {
    await stub.stop();
  });

  async function start(port?: number) {
    stub = new StubApiServer({ port });
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
});

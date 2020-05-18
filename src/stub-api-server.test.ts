import { agent } from 'supertest';

import { StubApiServer } from './stub-api-server';

describe('stub-api-server should', () => {
  let stub: StubApiServer;

  afterEach(async () => {
    await stub.stop();
  });

  it('start an http server using the provided port', async () => {
    stub = new StubApiServer({ port: 4444 });
    await stub.start();

    const response = await agent(stub.listeningUrl()).get('/');
    expect(response.status).toBeNumber();
  });

  it('start an http server random port', async () => {
    stub = new StubApiServer();
    await stub.start();

    const response = await agent(stub.listeningUrl()).get('/');
    expect(response.status).toBeNumber();
  });

  it('by default responds 501 on all requests', async () => {
    stub = new StubApiServer();
    await stub.start();

    const response = await agent(stub.listeningUrl()).get('/');
    expect(response.status).toBe(501);
  });
});

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

    const response = await agent('http://localhost:4444').get('/');
    expect(response.status).toBeNumber();
  });
});

import { agent } from 'supertest';

import { newServer } from './server';

describe('Basic example', () => {
  const server = newServer();

  beforeEach(() => server.start());

  afterEach(() => server.stop());

  it('should work', async () => {
    const response = await agent(server.listeningUrl()).get('/hello');
    expect(response.status).toBe(200);
  });
});

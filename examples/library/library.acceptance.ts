import { agent } from 'supertest';

import { newServer } from './server';

describe('Library example', () => {
  const server = newServer();

  beforeEach(() => server.start());
  afterEach(() => server.stop());

  it('should work', async () => {
    const book = await agent(server.listeningUrl()).get('/books/123');
    expect(book.status).toBe(200);

    const books = await agent(server.listeningUrl()).get('/books?page=2');
    expect(books.status).toBe(200);

    const author = await agent(server.listeningUrl())
      .post('/authors')
      .send({ firstName: 'John', lastName: 'Doe' });
    expect(author.status).toBe(201);
  });
});

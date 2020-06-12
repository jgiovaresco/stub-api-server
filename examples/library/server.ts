import { StubApiServer } from '../../src';
import { authorRoutes, booksRoutes } from './routes';

export function newServer(port?: number) {
  const server = new StubApiServer({ port });
  return server.useRoutes([...authorRoutes, ...booksRoutes]);
}

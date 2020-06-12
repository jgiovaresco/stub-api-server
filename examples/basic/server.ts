import { StubApiServer } from '../../src';
import { helloRoute } from './routes/route';

export function newServer(port?: number) {
  const server = new StubApiServer({ port });
  return server.useRoutes([helloRoute]);
}

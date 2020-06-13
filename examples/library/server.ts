import { StubApiServer } from '../../src';

export function newServer(port?: number) {
  const server = new StubApiServer({ port });
  return server.useRoutesFromDir(`${__dirname}/routes`);
}

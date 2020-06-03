import path from 'path';
import { StubApiServer } from '../../src';

const server = new StubApiServer();

(async () => {
  await server.useRoutesFromDir(path.resolve('./routes'));
  await server.start();
})();

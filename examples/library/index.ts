import path from 'path';
import { StubApiServer } from '../../src';

const server = new StubApiServer({ port: 8000 });

(async () => {
  await server.useRoutesFromDir(path.resolve('./routes'));
  await server.start();
  console.info(`Listening on ${server.listeningUrl()}`);
})();

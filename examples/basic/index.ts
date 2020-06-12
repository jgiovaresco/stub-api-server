import { newServer } from './server';

(async () => {
  const server = newServer(8000);
  await server.start();
  console.info(`Listening on ${server.listeningUrl()}`);
})();

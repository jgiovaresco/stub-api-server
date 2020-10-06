import { newServer } from './server';

void (async () => {
  const server = await newServer(8000);
  await server.start();
  console.info(`Listening on ${server.listeningUrl()}`);
})();

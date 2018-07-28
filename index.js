import server from './src/server';
import config from './src/server/config';

server.listen(config.port, () => {
  console.info(`server started on port ${config.port}`);
});
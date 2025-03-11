import { appConfig } from './configs/root-path.config';
import { Bootstrap } from './core/bootstrap';
async function bootstrap() {
  appConfig.rootPath = __dirname;
  console.log(`appConfig.rootPath in bootstrap`, appConfig.rootPath);
  const bootstrap = new Bootstrap();

  await bootstrap.initApp();
  bootstrap.enableCors();
  bootstrap.setupGlobalPrefix('v1');
  bootstrap.setupMiddleware();
  bootstrap.setupGlobalPipe();
  bootstrap.swaggerSetup();
  return bootstrap.startApp();
}

bootstrap();

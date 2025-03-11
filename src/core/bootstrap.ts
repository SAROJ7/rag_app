import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { AppModule } from 'src/app.module';
import { validateconfig } from 'src/configs/validate.config';

export class Bootstrap {
  private app: NestExpressApplication;
  private configService: ConfigService;

  private readonly logger = new Logger();
  private readonly globalPrefix: string = 'v1';

  async initApp() {
    this.app = await NestFactory.create(AppModule);
    this.configService = this.app.get(ConfigService);
  }

  enableCors() {
    this.app.enableCors();
  }

  setupMiddleware() {
    this.app.useBodyParser('json', { limit: '1000kb' });
    this.app.use(express.urlencoded({ extended: false }));
    //To Do
    //Compression
  }

  setupGlobalPrefix(globalPrefix?: string) {
    this.app.setGlobalPrefix(globalPrefix ?? this.globalPrefix);
  }

  setupGlobalPipe() {
    this.app.useGlobalPipes(validateconfig);
  }
  async startApp() {
    const port = this.configService.get<number>('port') || 5503;
    await this.app.listen(port);
    this.logger.log(
      `🚀 Application is running on: http://localhost:${port}/${this.globalPrefix}`,
    );
    this.logger.log(`🚀 API Docs: http://localhost:${port}/api-docs`);
    return port;
  }

  swaggerSetup() {
    const config = new DocumentBuilder()
      .setTitle('RAG Application')
      .setDescription(
        'RAG application to get answers from an Angular book using Langchain.js and Gemma 2 model',
      )
      .setVersion('1.0')
      .addTag('Gemma 2 , Langchain, RAG')
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document);
  }

  //Todo: Init View Engine
}

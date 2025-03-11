import { DynamicModule, Module } from '@nestjs/common';
import { VectorStoreService } from './applications/vector-store.service';
import { VectorStoreTestService } from './applications/vector-store.test.service';
import { VectorStoreController } from './presenters/http/vector-store.controller';
import { EmbeddingModels, VectorDatabasesType } from './applications/types';
import {
  TEXT_EMBEDDING_MODEL,
  VECTOR_DATABASE,
  VECTOR_STORE_TYPE,
} from './applications/constants/rag.constant';
import { ConfigService } from '@nestjs/config';
import { createTextEmbeddingModel } from './applications/embeddings/create-embedding-model';
import {
  createVectorDatabase,
  MemoryVectorDBService,
  QdrantVectorDBService,
} from './applications/vector-databases';

@Module({
  providers: [
    VectorStoreService,
    VectorStoreTestService,
    MemoryVectorDBService,
    QdrantVectorDBService,
  ],
  controllers: [VectorStoreController],
  exports: [VectorStoreService],
})
export class VectorStoreModule {
  static register(
    embeddingModel: EmbeddingModels,
    vectorStoreType: VectorDatabasesType,
  ): DynamicModule {
    return {
      module: VectorStoreModule,
      providers: [
        {
          provide: TEXT_EMBEDDING_MODEL,
          useFactory: (configService: ConfigService) =>
            createTextEmbeddingModel(configService, embeddingModel),
          inject: [ConfigService],
        },
        {
          provide: VECTOR_STORE_TYPE,
          useValue: vectorStoreType,
        },
        {
          provide: VECTOR_DATABASE,
          useFactory: (
            type: VectorDatabasesType,
            configService: ConfigService,
          ) => createVectorDatabase(type, configService),
          inject: [VECTOR_STORE_TYPE, ConfigService],
        },
      ],
    };
  }
}

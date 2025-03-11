import { Inject, Injectable, Logger } from '@nestjs/common';
import { TEXT_EMBEDDING_MODEL } from './constants/rag.constant';
import { Embeddings } from '@langchain/core/embeddings';
import { VectorStoreService } from './vector-store.service';

@Injectable()
export class VectorStoreTestService {
  private readonly logger = new Logger(VectorStoreTestService.name);

  constructor(
    @Inject(TEXT_EMBEDDING_MODEL) private embeddings: Embeddings,
    private vectorStoreService: VectorStoreService,
  ) {}

  async testEmbedding(): Promise<number[]> {
    return this.embeddings.embedQuery(
      `Register embedding model in NestJS is OK.`,
    );
  }

  testRetriever() {
    return this.vectorStoreService.asRetriever();
  }
}

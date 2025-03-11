import { DatabaseConfig } from '../types';
import {
  VectorStoreRetriever,
  VectorStore,
} from '@langchain/core/vectorstores';

export interface VectorDatabase {
  init(config: DatabaseConfig): Promise<void>;
  asRetriever(): VectorStoreRetriever<VectorStore>;
}

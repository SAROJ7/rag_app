import { Document } from '@langchain/core/documents';
import { VectorDatabasesType } from './vector-databases.type';
import { Embeddings } from '@langchain/core/embeddings';

type VectorDatabaseFactoryConfig = {
  docs: Document<Record<string, any>>[];
  type: VectorDatabasesType;
  embeddings: Embeddings;
};

export type DatabaseConfig = Omit<VectorDatabaseFactoryConfig, 'type'>;

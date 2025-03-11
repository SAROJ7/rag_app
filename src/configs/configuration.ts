export default () => ({
  port: parseInt(process.env.PORT || '5504', 10),

  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    embeddingModel:
      process.env.OPEN_AI_EMBEDDING_MODEL || 'text-embedding-ada-002',
  },

  huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY || '',
    embeddingModel:
      process.env.HUGGINGFACE_EMBEDDING_MODEL || 'BAAI/bge-small-en-v1.5',
  },

  qdrant: {
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    apiKey: process.env.QDRANT_API_KEY || '',
  },
});

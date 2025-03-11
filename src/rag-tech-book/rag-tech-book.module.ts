import { Module } from '@nestjs/common';
import { RagTechBookService } from './applications/rag-tech-book.service';
import { RagTechBookController } from './presenters/http/rag-tech-book.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { VectorStoreModule } from 'src/vector-store/vector-store.module';

@Module({
  imports: [OpenaiModule, VectorStoreModule.register('OPEN_AI', 'MEMORY')],
  controllers: [RagTechBookController],
  providers: [RagTechBookService],
})
export class RagTechBookModule {}

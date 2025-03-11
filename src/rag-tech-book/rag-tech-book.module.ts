import { Module } from '@nestjs/common';
import { RagTechBookService } from './applications/rag-tech-book.service';
import { RagTechBookController } from './presenters/http/rag-tech-book.controller';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [RagTechBookController],
  providers: [RagTechBookService],
})
export class RagTechBookModule {}

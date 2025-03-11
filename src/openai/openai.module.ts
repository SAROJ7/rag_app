import { Module } from '@nestjs/common';
import { OpenaiService } from './application/openai.service';
import { OpenaiController } from './presenter/http/openai.controller';
import { OpenaiChatModelProvider } from './application/providers/openai-chat-model.provider';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, OpenaiChatModelProvider],
  exports: [OpenaiChatModelProvider],
})
export class OpenaiModule {}

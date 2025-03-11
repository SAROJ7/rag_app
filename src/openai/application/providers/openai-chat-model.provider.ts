import { ConfigService } from '@nestjs/config';
import { OPENAI_CHAT_MODEL } from '../constants/openai.constant';
import { openAIConfig } from '../types/openai-config.type';
import { ChatOpenAI } from '@langchain/openai';
import { Provider } from '@nestjs/common';

export const OpenaiChatModelProvider: Provider<ChatOpenAI> = {
  provide: OPENAI_CHAT_MODEL,
  useFactory: (configService: ConfigService) => {
    const config = configService.get<openAIConfig>('openai');
    if (!config) {
      throw new Error('OpenAI configuration not found');
    }
    const { apiKey, model } = config;
    return new ChatOpenAI({
      apiKey,
      model,
      temperature: 0.1,
      maxTokens: 2048,
      streaming: false,
    });
  },
  inject: [ConfigService],
};

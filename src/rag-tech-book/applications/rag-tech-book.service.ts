/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChatOpenAI } from '@langchain/openai';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OPENAI_CHAT_MODEL } from 'src/openai/application/constants/openai.constant';
import { VectorStoreService } from '~vector-store/applications/vector-store.service';
import { createContextualQuestion } from './chat-with-history/create-contextual-chain';
import { ConversationContent } from './types/conversation-content.types';
import {
  Runnable,
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { formatDocumentsAsString } from 'langchain/util/document';
import { qaPrompt } from './constants/prompts.constant';
import { BaseMessage } from '@langchain/core/messages';

@Injectable()
export class RagTechBookService {
  private chat_history: BaseMessage[] = [];
  constructor(
    @Inject(OPENAI_CHAT_MODEL) private model: ChatOpenAI,
    private readonly vectorStoreService: VectorStoreService,
  ) {}
  async ask(question: string): Promise<ConversationContent[]> {
    const contextualizedQueston = createContextualQuestion(this.model);
    const retriever = this.vectorStoreService.asRetriever();

    try {
      const ragChain = RunnableSequence.from([
        RunnablePassthrough.assign({
          context: (input: Record<string, any>) => {
            if ('chat_history' in input) {
              const chain = contextualizedQueston(input);
              return (chain as Runnable)
                .pipe(retriever)
                .pipe(formatDocumentsAsString);
            }
            return '';
          },
        }),
        qaPrompt,
        this.model,
      ]);

      const aiMessage = await ragChain.invoke({
        question,
        chat_history: this.chat_history,
      });

      this.chat_history = this.chat_history.concat(aiMessage);
      if (this.chat_history.length > 10) {
        this.chat_history.shift();
      }
      return [
        {
          role: 'Human',
          content: question,
        },
        {
          role: 'Assistant',
          content: (aiMessage.content as string) || '',
        },
      ];
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException(error);
    }
  }
}

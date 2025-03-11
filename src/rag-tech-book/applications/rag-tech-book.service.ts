import { Inject, Injectable } from '@nestjs/common';
import { CreateRagTechBookDto } from '../dto/create-rag-tech-book.dto';
import { UpdateRagTechBookDto } from '../dto/update-rag-tech-book.dto';
import { ConversationContent } from './types/conversation-content.types';
import { createContextualChain } from './chat-with-history/create-contextual-chain';
import { OPENAI_CHAT_MODEL } from 'src/openai/application/constants/openai.constant';
import { ChatOpenAI } from '@langchain/openai';

@Injectable()
export class RagTechBookService {
  constructor(@Inject(OPENAI_CHAT_MODEL) private model: ChatOpenAI) {}
  // async ask(question: string): Promise<ConversationContent[]> {
  //   const contextualizedQueston = createContextualChain()
  // }
  create(createRagTechBookDto: CreateRagTechBookDto) {
    return 'This action adds a new ragTechBook';
  }

  findAll() {
    return `This action returns all ragTechBook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ragTechBook`;
  }

  update(id: number, updateRagTechBookDto: UpdateRagTechBookDto) {
    return `This action updates a #${id} ragTechBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} ragTechBook`;
  }
}

import { Controller, Get, HttpStatus } from '@nestjs/common';
import { OpenaiService } from '../../application/openai.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageContent } from '@langchain/core/messages';

@ApiTags('Openai Chain')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get()
  @ApiResponse({
    description: 'The AI message of Openai Chat Model',
    type: String,
    status: HttpStatus.OK,
  })
  testchain(): Promise<MessageContent> {
    return this.openaiService.generateText('What is agentic RAG?');
  }
}

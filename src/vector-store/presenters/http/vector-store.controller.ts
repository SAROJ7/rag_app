/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VectorStoreTestService } from '~vector-store/applications/vector-store.test.service';

@ApiTags('Vector Store')
@Controller('vector-store')
export class VectorStoreController {
  constructor(
    private readonly vectorStoreTestService: VectorStoreTestService,
  ) {}

  @ApiResponse({
    description: `Retrieve retriever's name`,
    type: String,
    status: HttpStatus.OK,
  })
  @Get('retriever')
  async testRetriever() {
    return (await this.vectorStoreTestService.testRetriever()).getName();
  }
  @ApiResponse({
    description: 'Generate an embedding vector',
    type: Number,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Get('embedding')
  testTextEmbedding(): Promise<number[]> {
    return this.vectorStoreTestService.testEmbedding();
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateRagTechBookDto } from '../../dto/update-rag-tech-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { RagTechBookService } from 'src/rag-tech-book/applications/rag-tech-book.service';
import { AskDtos } from '../dtos/ask-dto';

@ApiTags('rag')
@Controller('rag')
export class RagTechBookController {
  constructor(private readonly ragTechBookService: RagTechBookService) {}

  @Post()
  async ask(@Body() askDtos: AskDtos) {
    const conversation = await this.ragTechBookService.create(askDtos);
  }

  @Get()
  findAll() {
    return this.ragTechBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ragTechBookService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRagTechBookDto: UpdateRagTechBookDto,
  ) {
    return this.ragTechBookService.update(+id, updateRagTechBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ragTechBookService.remove(+id);
  }
}

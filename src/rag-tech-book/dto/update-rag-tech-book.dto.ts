import { PartialType } from '@nestjs/swagger';
import { CreateRagTechBookDto } from './create-rag-tech-book.dto';

export class UpdateRagTechBookDto extends PartialType(CreateRagTechBookDto) {}

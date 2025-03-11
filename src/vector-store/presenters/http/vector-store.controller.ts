import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vector Store')
@Controller('vector-store')
export class VectorStoreController {}

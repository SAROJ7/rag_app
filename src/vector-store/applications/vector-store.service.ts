import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class VectorStoreService {
  private readonly logger = new Logger(VectorStoreService.name);
}

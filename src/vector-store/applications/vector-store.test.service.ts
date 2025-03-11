import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class VectorStoreTestService {
  private readonly logger = new Logger(VectorStoreTestService.name);
}

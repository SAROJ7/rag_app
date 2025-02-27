import { ValidationPipe } from '@nestjs/common';

export const validateconfig = new ValidationPipe({
  whitelist: true,
  stopAtFirstError: true,
  forbidUnknownValues: true,
});

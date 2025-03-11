import { IsNotEmpty, IsString } from 'class-validator';

export class AskDtos {
  @IsString()
  @IsNotEmpty()
  query: string;
}

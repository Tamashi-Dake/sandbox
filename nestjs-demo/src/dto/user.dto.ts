import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  kia: boolean;
  @IsBoolean()
  worker: boolean;
  @IsNumber()
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

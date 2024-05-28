import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsPositive,
} from 'class-validator';

export class ContactDto {
  @ApiProperty({ description: 'The unique identifier of the contact' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsPositive()
  id: number;

  @ApiProperty({ description: 'The name of the contact' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: 'The email address of the contact' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The phone number of the contact',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @ApiProperty({
    description: 'The date of birth of the contact in ISO 8601 format',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dob?: string;
}

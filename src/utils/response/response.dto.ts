import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T> {
  @ApiProperty({ required: true, readOnly: true })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @ApiProperty({ required: true })
  @IsNumber()
  statusCode: HttpStatus;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  message: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  data: T | string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  path: any;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  method: string;

  @ApiProperty({ required: false })
  requestId?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  timestamp: number;
}

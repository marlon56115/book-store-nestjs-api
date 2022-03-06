//un dto es una clase corriente pero solo se usa para transmitir datos Data trabsfer Object

import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ReadUserDetailDto } from './read-user-details.dto';

export class ReadUserDto {
   @IsNumber()
   readonly id: number;

   @IsEmail()
   readonly email: string

   @IsString()
   readonly username: string

   @Type(type => ReadUserDetailDto)
   readonly details: ReadUserDetailDto;
}
//un dto es una clase corriente pero solo se usa para transmitir datos Data trabsfer Object

import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ReadUserDetailDto } from './read-user-details.dto';
import { ReadRoleDto } from '../../role/dtos/read-role.dto';

@Exclude()
export class ReadUserDto {
   @Expose()
   @IsNumber()
   readonly id: number;

   @Expose()
   @IsEmail()
   readonly email: string

   @Expose()
   @IsString()
   readonly username: string

   @Expose()
   @Type(type => ReadUserDetailDto)
   readonly details: ReadUserDetailDto;

   @Expose()
   @Type(type => ReadRoleDto)
   readonly roles: ReadRoleDto[];
}
import { IsString, IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDto } from '../../user/dtos/index'

@Exclude()
export class ReadBookDto {
   @Expose()
   @IsNumber()
   readonly id: number;

   @Expose()
   @IsString()
   readonly name: string;

   @Expose()
   @IsString()
   readonly description: string;

   @Expose()
   @Type(type => ReadUserDto)
   readonly authors: ReadUserDto[];
}
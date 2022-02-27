//un dto es una clase corriente pero solo se usa para transmitir datos Data trabsfer Object

import { IsNotEmpty } from "class-validator";
import { RoleType } from '../../role/roletype.enum';
import { UserDetails } from '../user.details.entity';


export class UserDto {
   @IsNotEmpty()
   id: number;

   @IsNotEmpty()
   username: string
   
   @IsNotEmpty()
   email: string

   @IsNotEmpty()
   roles: RoleType[]
   
   @IsNotEmpty()
   details:UserDetails
}
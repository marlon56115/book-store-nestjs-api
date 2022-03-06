import { RoleType } from '../role/roletype.enum';

//interfaz que se usa para dar formato al payload para crear el token
export interface IJwtPayload{
   id: number;
   username: string;
   email: string;
   roles: RoleType[];
   iat?: Date; //opcional
}
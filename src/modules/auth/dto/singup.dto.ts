import { isNotEmpty, IsNotEmpty, isString, IsString } from "class-validator";

/**creamos este DTO para no usar el modelo User porque solo se ocupan 2 campos para iniciar sesion y si
 * usamos el modelo User tiene demasiados campos que no tilizariamos
 */
export class SingUpDto {

   @IsNotEmpty()
   @IsString()
   username: string;
   
   @IsNotEmpty()
   @IsString()
   password: string

   @IsNotEmpty()
   @IsString()
   email: string
}
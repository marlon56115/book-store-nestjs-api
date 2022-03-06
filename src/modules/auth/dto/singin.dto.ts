import { isNotEmpty, IsNotEmpty, isString, IsString } from "class-validator";

/**creamos este DTO para no usar el modelo User porque solo se ocupan 2 campos para iniciar sesion y si
 * usamos el modelo User tiene demasiados campos que no tilizariamos
 */
export class SingInDto {

   @IsNotEmpty()
   @IsString()
   username: string;
   
   @IsNotEmpty()
   @IsString()
   password: string
}
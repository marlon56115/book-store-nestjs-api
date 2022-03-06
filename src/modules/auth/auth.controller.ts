import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SingUpDto } from './dto/singup.dto';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/singin.dto';
import { LoggedInDto } from './dto/logged-in.dto';

@Controller('auth')
export class AuthController {

   constructor(
      private readonly _authService:AuthService
   ){}

   /**
    * endpoint para registrarse
    * 
    * @param singUpDto 
    * @returns 
    */
   @Post('/singup')
   @UsePipes(ValidationPipe)
    singup(@Body() singUpDto: SingUpDto):Promise<boolean> {
      return this._authService.singup(singUpDto);
   }

   /**
    * endpoint para iniciar sesion
    * @param singInDto 
    * @returns 
    */
   @Post('/singin')
   @UsePipes(ValidationPipe)
    singin(@Body() singInDto: SingInDto): Promise<LoggedInDto> {
      return this._authService.singin(singInDto);
   }
}

import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SingUpDto } from './dto/singup.dto';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/singin.dto';

@Controller('auth')
export class AuthController {
   constructor(
      private readonly _authService:AuthService
   ){}

   @Post('/singup')
   @UsePipes(ValidationPipe)
   async singup(@Body() singUpDto: SingUpDto):Promise<void> {
      return this._authService.singup(singUpDto);
   }

   @Post('/singin')
   @UsePipes(ValidationPipe)
   async singin(@Body() singInDto: SingInDto): Promise<{token:string}> {
      return this._authService.singin(singInDto);
   }
}

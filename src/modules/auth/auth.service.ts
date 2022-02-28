import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { SingUpDto } from './dto/singup.dto';
import { SingInDto } from './dto/singin.dto';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roletype.enum';

@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(AuthRepository)
      private readonly _authRepository: AuthRepository,
      private readonly _jwtService: JwtService
   ) { }

   async singup(singupDto: SingUpDto): Promise<void> {
      const { username, email } = singupDto;
      const userExist = Boolean(await this._authRepository.findOne({
         where: [{ 'username': username }, { 'email': email }]
      })); 

      if (userExist) {
         throw new ConflictException('username or email already exist');
      }
      return this._authRepository.singUp(singupDto);
   }

   async singin(singinDto: SingInDto): Promise<{ token: string }> {
      const { username, password } = singinDto;
      const user = await this._authRepository.findOne({
         where: { username }
      });

      if (!user) {
         throw new NotFoundException('user doest not exist');
      }

      const isMatch = await compare(password, user.password);

      if (!isMatch) {
         throw new UnauthorizedException('bad credentials');
      }

      const payload: IJwtPayload = {
         id: user.id,
         email: user.email,
         username: user.username,
         roles: user.roles.map(r => r.name as RoleType)
      }
      const token = await this._jwtService.sign(payload);
      return { token }
   }
}

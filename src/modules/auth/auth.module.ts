import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '../../config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';
import { Configurations } from '../../config/config.keys';

@Module({
   controllers: [AuthController],

   providers: [AuthService, ConfigService, JwtStrategy],

   imports: [
      TypeOrmModule.forFeature([AuthRepository]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory(config: ConfigService) {
            return {
               secret: config.get(Configurations.JWT_SECRET),
               signOptions: {
                  expiresIn: 3600
               }
            };
         }
      })
   ],
   
   exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }

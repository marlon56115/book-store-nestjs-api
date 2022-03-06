import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from '../role/role.repository';

@Module({
   //al importar el sharedModule puedo hacer inyeccion de dependencias del mapper servide en mi modulko usuario
   imports:[TypeOrmModule.forFeature([UserRepository,RoleRepository]),AuthModule],
   providers: [UserService],
   controllers:[UserController]
})
export class UserModule {}

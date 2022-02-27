import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { SharedModule } from '../../shared/shared.module';
import { UserController } from './user.controller';

@Module({
   //al importar el sharedModule puedo hacer inyeccion de dependencias del mapper servide en mi modulko usuario
   imports:[TypeOrmModule.forFeature([UserRepository]),SharedModule],
   providers: [UserService],
   controllers:[UserController]
})
export class UserModule {}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.num';
import { ReadUserDto } from './dtos/read-user.dto';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {

   constructor(
      @InjectRepository(UserRepository)
      private readonly _userRepository: UserRepository,
      @InjectRepository(RoleRepository)
      private readonly _roleRepository: RoleRepository,
   ) { }

   /**
    * metodo que devuelve un usuario por id
    * @param id 
    * @returns 
    */
   async get(id: number): Promise<ReadUserDto> {
      if (!id) {
         throw new BadRequestException("id must be send");
      }
      const user: User = await this._userRepository.findOne(id, { where: { status: status.ACTVE } });
      if (!user) {
         throw new NotFoundException();
      }
      return plainToClass(ReadUserDto, user);
   }

   /**
    * metodo que devuelve todos los usuarios
    * @returns 
    */
   async getAll(): Promise<ReadUserDto[]> {
      const users: User[] = await this._userRepository.find({ where: { status: status.ACTVE } });
      return users.map((user: User) => plainToClass(ReadUserDto, user));
   }

   /**
    * metodo para actualizar un usuario 
    * @param userId 
    * @param user 
    */
   async update(userId: number, user: UpdateUserDto): Promise<ReadUserDto> {
      const foundUser = await this._userRepository.findOne(userId, { where: { status: 'ACTIVE' } });
      if (!foundUser) {
         throw new NotFoundException('User does not exist');
      }
      foundUser.username = user.username;

      const updatedUser = await this._userRepository.save(foundUser);
      return plainToClass(ReadUserDto, updatedUser);
   }

   /**
    * metodo para borrar un usuario
    * @param userId 
    */
   async delete(userId: number): Promise<void> {
      const userExist = await this._userRepository.findOne(userId, { where: { status: status.ACTVE } });

      if (!userExist) {
         throw new NotFoundException();
      }

      await this._userRepository.update(userId, { status: status.INACTIVE });
   }

   /**
    * Metodo para asignar un role a un usuario
    * @param userId 
    * @param roleId 
    * @returns 
    */
   async setRoleToUser(userId: number, roleId: number):Promise<boolean> {
      const userExist = await this._userRepository.findOne(userId, { where: { status: status.ACTVE } });
      if (!userExist) {
         throw new NotFoundException();
      }

      const roleExist = await this._roleRepository.findOne(roleId, { where: { status: status.ACTVE } });
      if (!roleExist) {
         throw new NotFoundException('Role does not exist');
      }

      userExist.roles.push(roleExist);
      await this._userRepository.save(userExist);

      return true;

   }
}

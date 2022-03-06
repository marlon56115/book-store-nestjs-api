import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.num';

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
   async get(id: number): Promise<User> {
      if (!id) {
         throw new BadRequestException("id must be send");
      }
      const user: User = await this._userRepository.findOne(id, { where: { status: status.ACTVE } });
      if (!user) {
         throw new NotFoundException();
      }
      return user;
   }

   /**
    * metodo que devuelve todos los usuarios
    * @returns 
    */
   async getAll(): Promise<User[]> {
   
      const users: User[] = await this._userRepository.find({ where: { status: status.ACTVE} });
      return users;
   }


   /**
    * metodo para crear usuarios
    * @param user 
    * @returns 
    */
   async create(user: User): Promise<User> {
      const details = new UserDetails();
      user.details = details;
      const repo = await getConnection().getRepository(Role);
      const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
      user.roles = [defaultRole];
      const saveUser = await this._userRepository.save(user);
      return saveUser;
   }

   /**
    * metodo para actualizar un usuario 
    * @param id 
    * @param user 
    */
   async update(id: number, user: User): Promise<void> {
      await this._userRepository.update(id, user);
   }

   /**
    * metodo para borrar un usuario
    * @param id 
    */
   async delete(id: number): Promise<void> {
      const userExist = await this._userRepository.findOne(id, { where: { status: status.ACTVE } });

      if (!userExist) {
         throw new NotFoundException();
      }

      await this._userRepository.update(id, { status: status.INACTIVE });
   }

   /**
    * Metodo para asignar un role a un usuario
    * @param userId 
    * @param roleId 
    * @returns 
    */
   async setRoleToUser(userId: number, roleId: number) {
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

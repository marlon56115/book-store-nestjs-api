import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';

@Injectable()
export class RoleService {

   constructor(
      @InjectRepository(RoleRepository)
      private readonly _roleRepository: RoleRepository,
   ) { }

   /**
    * metodo para obtener un role por id
    * @param id 
    * @returns 
    */
   async get(id: number): Promise<Role> {
      if (!id) {
         throw new BadRequestException("id must be send");
      }
      const role: Role = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });
      if (!role) {
         throw new NotFoundException();
      }
      return role;
   }

   /**
    * metodo para obtener todos los roles
    * @returns 
    */
   async getAll(): Promise<Role[]> {
      const roles: Role[] = await this._roleRepository.find({ where: { status: 'ACTIVE' } });
      return roles;
   }
   /**
    * 
    * @param role metodo para crear un rol
    * @returns 
    */
   async create(role: Role): Promise<Role> {
      const savedRole = await this._roleRepository.save(role);
      return savedRole;

   }

   /**
    * metodo para actualizar un rol
    * @param id 
    * @param role 
    */
   async update(id: number, role: Role): Promise<void> {
      await this._roleRepository.update(id, role);
   }

   /**
    * 
    * @param id metodo para eliminar un rol
    */
   async delete(id: number): Promise<void> {
      const roleExist = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });

      if (!roleExist) {
         throw new NotFoundException();
      }

      await this._roleRepository.update(id, { status: 'INACTIVE' });
   }
}
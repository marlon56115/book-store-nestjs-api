import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';
import { ReadRoleDto } from './dtos/read-role.dto';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto } from './dtos';
import { status } from '../../shared/entity-status.num';

@Injectable()
export class RoleService {

   constructor(
      @InjectRepository(RoleRepository)
      private readonly _roleRepository: RoleRepository,
   ) { }

   /**
    * metodo para obtener un role por roleId
    * @param roleId 
    * @returns 
    */
   async get(roleId: number): Promise<ReadRoleDto> {
      if (!roleId) {
         throw new BadRequestException("roleId must be send");
      }
      const role: Role = await this._roleRepository.findOne(roleId, { where: { status: status.ACTVE } });
      if (!role) {
         throw new NotFoundException();
      }

      //va a mapear las propiedades de role que se llamen igual en readRoleDto, para
      //solo devolver las propiedades que yo defini en el readRoleDto
      return plainToClass(ReadRoleDto, role);
   }

   /**
    * metodo para obtener todos los roles
    * @returns 
    */
   async getAll(): Promise<ReadRoleDto[]> {
      const roles: Role[] = await this._roleRepository.find({ where: { status: status.ACTVE } });
      return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
   }
   /**
    * 
    * @param role metodo para crear un rol
    * @returns 
    */
   async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
      const savedRole = await this._roleRepository.save(role);
      return plainToClass(ReadRoleDto, savedRole);

   }

   /**
    * metodo para actualizar un rol
    * @param roleId 
    * @param role 
    */
   async update(roleId: number, role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
      const foundRole: Role = await this._roleRepository.findOne(roleId, {
         where: { status: status.ACTVE }
      });
      if (!foundRole) {
         throw new NotFoundException('This rone does not exist');
      }
      foundRole.name = role.name;
      foundRole.description = role.description;

      const updatedRole: Role = await this._roleRepository.save(foundRole);
      return plainToClass(ReadRoleDto, updatedRole);
   }

   /**
    * 
    * @param roleId metodo para eliminar un rol
    */
   async delete(roleId: number): Promise<void> {
      const roleExist = await this._roleRepository.findOne(roleId, { where: { status: status.ACTVE } });

      if (!roleExist) {
         throw new NotFoundException();
      }

      await this._roleRepository.update(roleId, { status: status.INACTIVE });
   }
}
import { EntityRepository, Repository } from "typeorm";
import { Role } from './role.entity';

//declaramos asi para que pueda usar los metodos de la base de datos
@EntityRepository(Role)
export class RoleRepository extends Repository<Role>{ }
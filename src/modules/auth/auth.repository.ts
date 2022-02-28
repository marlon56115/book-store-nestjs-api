import { EntityRepository, Repository, getConnection } from 'typeorm';
import { User } from "../user/user.entity";
import { SingUpDto } from "./dto";
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User>{

   /**
    * metodo base para registrar un usuario
    * 
    * @param singUpDto:SingUpDto
    */
   async singUp(singUpDto: SingUpDto) {
      const { username, email, password } = singUpDto;
      const user = new User();
      user.username = username;
      user.email = email;
      const roleRepository: RoleRepository = await getConnection().getRepository(Role);
      const defaultRole: Role = await roleRepository.findOne({ where: { name: RoleType.GENERAL } });
      user.roles = [defaultRole];
      //esta entidad solo existe a nivel de memoria, pero al guardar el usuario, este detalle tambien sera 
      //guardado automaticamente por la opcion cascade que le pusimos en la entidad
      const details = new UserDetails();
      user.details = details;
      //encripttacion
      const salt = await genSalt(10);
      user.password = await hash(password, salt);
      //guardar usuario
      await user.save();
   }
}
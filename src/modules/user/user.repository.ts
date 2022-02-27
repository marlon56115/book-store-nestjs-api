import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

//declaramos asi para que pueda usar los metodos de la base de datos
@EntityRepository(User)
export class UserRepository extends Repository<User>{}
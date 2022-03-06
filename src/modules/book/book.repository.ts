import { EntityRepository, Repository } from "typeorm";
import { Book } from "./book.entity";

//declaramos asi para que pueda usar los metodos de la base de datos
@EntityRepository(Book)
export class BookRepository extends Repository<Book>{ }
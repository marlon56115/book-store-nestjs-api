import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserDetails } from "./user.details.entity";
import { Role } from '../role/role.entity';
import { Book } from '../book/book.entity';

@Entity('users')
export class User extends BaseEntity {

   @PrimaryGeneratedColumn('increment')
   id: number;

   @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
   username: string;

   @Column({ type: 'varchar', nullable: false })
   email: string;

   @Column({ type: 'varchar', nullable: false })
   password: string;

   @OneToOne(type => UserDetails, { cascade: true, nullable: false, eager: true })
   @JoinColumn({ name: 'detail_id' })
   details: UserDetails;

   //eager para que mande los rones de un solo
   @ManyToMany(type => Role, role => role.users, { eager: true })
   @JoinTable({ name: 'user_roles', joinColumn: { name: 'user_id', referencedColumnName: 'id' }, inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' } })
   roles: Role[];

   //eager para que mande los rones de un solo
   @ManyToMany(type => Book, book => book.authors)
   @JoinTable({ name: 'user_books', joinColumn: { name: 'user_id', referencedColumnName: 'id' }, inverseJoinColumn: { name: 'book_id', referencedColumnName: 'id' } })
   books: Book[];

   @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
   status: string;

   @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
   updatedAt: Date;
} 
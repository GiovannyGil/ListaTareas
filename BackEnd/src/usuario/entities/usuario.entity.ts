import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TipoUsuario } from 'src/tipo-usuario/entities/tipo-usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';


@ObjectType() //GraphQL
@Entity({ name: 'Usuarios' }) // TypeOMR
export class Usuario {
  @Field(() => Int, { description: 'Identificador unico autoincrementable' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name:'nombres', type: 'varchar', length: 50, nullable: false })
  nombres: string;

  @Field()
  @Column({ name:'apellidos', type: 'varchar', length: 50, nullable: false })
  apellidos: string;

  @Field()
  @Column({ name: 'nombreUsuario', type: 'varchar', length: 20, nullable: false })
  nombreUsuario: string

  @Field()
  @Column({ name:'correo', unique: true, nullable: false, length: 50, type: 'varchar' })
  correo: string;

  @Field()
  @Column({ name:'celular', unique: true, nullable: false, length: 15, type: 'varchar' })
  celular: string;

  @Field()
  @Column({ name:'clave', type: 'varchar', length: 100, nullable: false })
  clave: string;

  @Field()
  @Column({ name:'genero', type: 'varchar', length: 1, nullable: false })
  genero: string;

  @Field({ defaultValue: true })
  @Column({ name:'estado', default: true })
  estado: boolean;

  @Field({ nullable: false })
  @Column({ type: "date", nullable: false })
  createdAt: Date

  @Field({ nullable: true })
  @Column({ type: "date", nullable: true })
  updatedAt: Date

  @Field({ nullable: true })
  @Column({ type: "date", nullable: true })
  deletedAt: Date

  //** relaciones
  // todo: con tipo usuario -> un usuario solo puede tener un tipo de usuario, un tipo de usuario puede tener muchos usuarios
  @Field(() => TipoUsuario, { description: 'Tipo de usuario al que pertenece' })
  @ManyToOne(() => TipoUsuario, tipoUsuario => tipoUsuario.usuarios, { nullable: false })
  @JoinColumn({ name: 'tipoUsuarioId' })
  tipoUsuario: TipoUsuario;

  // todo: con rol -> un usuario solo puede tener un rol, un rol puede tener muchos usuarios
  @Field(() => Role, { description: 'Rol del usuario' })
  @ManyToOne(() => Role, (role) => role.usuarios) // Relacion N:1 con Role
  @JoinColumn({ name: "rolId" }) // tabla intermedia (detalles) > se pone en la tabla que tiene la llave foranea
  rol: Role

  @BeforeInsert()
  setCreatedAt() {
      this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
      this.updatedAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
      if (this.clave && !this.clave.startsWith('$2b$')) { // Verifica si no está ya encriptada
          const salt = await bcrypt.genSalt(10);
          this.clave = await bcrypt.hash(this.clave, salt);
      }
  }
}


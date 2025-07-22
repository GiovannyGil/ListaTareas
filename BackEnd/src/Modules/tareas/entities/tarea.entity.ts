import { Usuario } from '@/Modules/usuario/entities/usuario.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'Tareas' })
export class Tarea {
  @Field(() => Int, { description: 'Identificador unico autoincrementable' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'titulo', type: 'varchar', length: 100, nullable: false })
  titulo: string;

  @Field()
  @Column({ name: 'descripcion', length: 255, type: 'text', nullable: false })
  descripcion: string;

  @Field()
  @Column({ name: 'fechaLimite', type: 'date', nullable: true})
  fechaLimite: Date;

  @Field()
  @Column({ name: 'prioridad', type: 'varchar', length: 20, nullable: false })
  prioridad: string;

  @Field()
  @Column({ name: 'dificultad', type: 'varchar', length: 20, nullable: false })
  dificultad: string;

  @Field({ defaultValue: true })
  @Column({ name: 'estado', default: true })
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

  //** Relaciones
  // todo: con usuario -> una tarea solo puede tener un usuario, un usuario puede tener muchas tareas
  @Field(() => Usuario, { description: 'Usuario al que pertenece la tarea' })
  @ManyToOne(() => Usuario, usuario => usuario.tareas, { nullable: false })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @BeforeInsert()
  setCreatedAt() {
      this.createdAt = new Date();
  }
  
  @BeforeUpdate()
  setUpdatedAt() {
      this.updatedAt = new Date();
  }
}

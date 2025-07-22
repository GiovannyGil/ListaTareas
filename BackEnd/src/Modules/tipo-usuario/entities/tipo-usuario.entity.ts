import { Usuario } from '@/Modules/usuario/entities/usuario.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'TipoUsuarios' }) // TypeORM
export class TipoUsuario {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Field()
    @Column({ name: 'nombre', type: 'varchar', length: 50, unique: true, nullable: false })
    nombre: string;

    @Field()
    @Column({ name: 'descripcion', type: 'varchar', length: 255, nullable: true })
    descripcion: string;

    @Field()
    @Column({ name: 'estado', type: 'boolean', default: true })
    estado: boolean;

    @Field(() => Date, { nullable: false })
    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Field(() => Date, { nullable: true })
    @Column({ type: "date", nullable: true })
    updatedAt: Date

    @Field(() => Date, { nullable: true })
    @Column({ type: "date", nullable: true })
    deletedAt: Date

    //** relaciones
    // todo: con usuairos -> un usuario solo puede tener un tipo de usuario, un tipo de usuario puede tener muchos usuarios
    @OneToMany(() => Usuario, usuario => usuario.tipoUsuario)
    usuarios: Usuario[];

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
}

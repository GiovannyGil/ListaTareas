import { Usuario } from "@/Modules/usuario/entities/usuario.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'Roles' })
export class Role {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number

    @Field()
    @Column({ type: "varchar", length: 20, nullable: false, unique: true, name: "nombreRol" })
    nombreRol: string

    @Field()
    @Column({ type: "varchar", length: 100, nullable: false, name: "descripcion" })
    descripcion: string

    @Field()
    @Column({ type: "int", nullable: false, default: 1, name: "estado" })
    estado: number

    @Field(() => Date, { nullable: false })
    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Field(() => Date, { nullable: true })
    @Column({ type: "date", nullable: true })
    updatedAt: Date

    @Field(() => Date, { nullable: true })
    @DeleteDateColumn({ type: 'datetime', name: 'deletedAt', nullable: true })
    deletedAt: Date;


    //* relaciones aqui
    // todo: con usuarios -> un rol puede tener muchos usuarios, un usuario solo puede tener un rol
    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[]


    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }

}

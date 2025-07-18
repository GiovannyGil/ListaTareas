import { Usuario } from "src/usuario/entities/usuario.entity";
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Roles' })
export class Role {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number

    @Column({ type: "varchar", length: 20, nullable: false, unique: true, name: "nombreRol" })
    nombreRol: string

    @Column({ type: "varchar", length: 100, nullable: false, name: "descripcion" })
    descripcion: string

    @Column({ type: "int", nullable: false, default: 1, name: "estado" })
    estado: number

    @Column({ type: "date", nullable: true })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

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

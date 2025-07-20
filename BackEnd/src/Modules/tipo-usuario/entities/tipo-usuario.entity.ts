import { Usuario } from '@/Modules/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'TipoUsuarios' }) // TypeORM
export class TipoUsuario {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50, unique: true, nullable: false })
    nombre: string;

    @Column({ name: 'descripcion', type: 'varchar', length: 255, nullable: true })
    descripcion: string;

    @Column({ name: 'estado', type: 'boolean', default: true })
    estado: boolean;

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

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

import { EntitySchema } from "typeorm";

export const TipoUsuario = new EntitySchema(
    { name: "TipoUsuario", tableName: "tipo_usuarios",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
            nullable: false,
        },
        nombreTipo: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        descripcion: {
            type: "text",
            length: 500,
            nullable: true,
        },
        createdAt: {
            type: "date",
            createDate: true,
        },
        updatedAt: {
            type: "date",
            updateDate: true,
        },
        deletedAt: {
            type: "date",
            nullable: true,
        },
    },
    relations: {
        usuarios: {
            target: "Usuario",
            type: "one-to-many",
            inverseSide: "tipoUsuario",
            cascade: true,
        }
    }
});
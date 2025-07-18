import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTipoUsuarioDto {
    @IsString({ message: 'El nombre del rol debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del rol no puede estar vacío' })
    @Length(1, 50, { message: 'El nombre del rol debe tener entre 1 y 20 caracteres' })
    nombre: string;

    @IsString({ message: 'La descripción del rol debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción del rol no puede estar vacía' })
    @Length(1, 255, { message: 'La descripción del rol debe tener entre 1 y 100 caracteres' })
    descripcion: string;

    @IsBoolean({ message: 'El estado del rol debe ser un booleano' })
    @IsNotEmpty({ message: 'El estado del rol no puede estar vacío' })
    estado: boolean;
}

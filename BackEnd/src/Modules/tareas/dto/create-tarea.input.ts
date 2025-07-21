import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateTareaInput {
  @Field(() => String, { description: 'Título de la tarea' })
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @Length(1, 50, { message: 'el tamaño es de maximo 50 carácteres' })
  titulo: string;

  @Field(() => String, { description: 'Descripción de la tarea' })
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @Length(1, 200, { message: 'el tamaño es de maximo 200 carácteres' })
  descripcion: string;

  
  @Field(() => Date, { nullable: true, description: 'Fecha límite de la tarea' })
  @IsString({ message: 'el campo debe ser una fecha' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  fechaLimite?: Date;

  @Field(() => String, { description: 'Prioridad de la tarea' })
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  prioridad: string;

  @Field(() => String, { description: 'Dificultad de la tarea' })
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  dificultad: string;

  @Field(() => Boolean, { defaultValue: true, description: 'Estado de la tarea' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @IsString({ message: 'el campo debe ser un boolean' })
  estado: boolean;
  
  @Field(() => Int, { description: 'ID del usuario asignado a la tarea' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @IsString({ message: 'el campo debe ser un número' })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  usuarioId: number;
}

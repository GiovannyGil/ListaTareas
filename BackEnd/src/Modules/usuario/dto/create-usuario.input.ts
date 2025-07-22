import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CreateUsuarioInput {
  @Field()
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @Length(1, 50, { message: 'el tamaño es de maximo 20 carácteres' })
  nombres: string

  @Field()
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @Length(1, 50, { message: 'el tamaño es de maximo 20 carácteres' })
  apellidos: string

  @Field()
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @Length(1, 20, { message: 'el tamaño es de maximo 20 carácteres' })
  nombreUsuario: string

  @Field()
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @Length(1, 30, { message: 'el tamaño es de maximo 30 carácteres' })
  correo: string

  @Field()
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @Length(1, 15, { message: 'el tamaño es de maximo 10 carácteres' })
  celular: string

  @Field()
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @Length(1, 100, { message: 'el tamaño es de maximo 100 carácteres' })
  clave: string

  @Field()
  @IsString({ message: 'el campo debe ser un string' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @Length(1, 1, { message: 'el tamaño es de un carácter' })
  genero: string

  @Field()
  @IsString({ message: 'el campo es boolean' })
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  estado: boolean

  @Field(() => Int)
  @IsInt({ message: 'El tipo de usuario debe ser un número' })
  @IsNotEmpty({ message: 'El tipo de usuario es requerido' })
  tipoUsuarioId: number;

  @Field(() => Int)
  @IsInt({ message: 'El rol debe ser un número' })
  @IsNotEmpty({ message: 'El rol es requerido' })
  rolId: number
}

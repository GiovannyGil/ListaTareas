import { CreateTareaInput } from './create-tarea.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTareaInput extends PartialType(CreateTareaInput) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  titulo?: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field(() => Date, { nullable: true, description: 'Fecha límite de la tarea' })
  fechaLimite?: Date;

  @Field(() => String, { nullable: true, description: 'Prioridad de la tarea' })
  prioridad?: string;

  @Field(() => String, { nullable: true, description: 'Dificultad de la tarea' })
  dificultad?: string;

  @Field(() => Boolean, { nullable: true, description: 'Estado de la tarea' })
  estado?: boolean;

  @Field(() => Int, { nullable: true, description: 'ID del usuario asignado a la tarea' })
  usuarioId?: number;
}

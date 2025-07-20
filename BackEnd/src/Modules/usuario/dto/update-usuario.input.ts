import { CreateUsuarioInput } from './create-usuario.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsuarioInput extends PartialType(CreateUsuarioInput) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  correo?: string;

  // otros campos opcionales...

  @Field(() => Int, { nullable: true })
  rolId?: number;
}

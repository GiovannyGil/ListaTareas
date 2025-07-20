import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';

@Resolver(() => Usuario)
export class UsuarioResolver {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Mutation(() => Usuario)
  async crearUsuario(@Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput) {
    return this.usuarioService.crearUsuario(createUsuarioInput);
  }

  @Query(() => [Usuario], { name: 'usuarios' })
  async buscarUsuarios() {
    return this.usuarioService.buscarUsuarios();
  }

  @Query(() => Usuario, { name: 'usuario' })
  async buscarUsuarioxID(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioService.buscarUsuarioxID(id);
  }

  @Mutation(() => Usuario)
  async actualizarUsuario(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput
  ) {
    return this.usuarioService.ActualizarUsuario(id, updateUsuarioInput);
  }

  @Mutation(() => Boolean)
  async eliminarUsuarioSoftDelete(@Args('id', { type: () => Int }) id: number) {
    await this.usuarioService.EliminarUsuarioSoftDelete(id);
    return true;
  }

  @Mutation(() => Boolean)
  async eliminarUsuarioPermanente(@Args('id', { type: () => Int }) id: number) {
    await this.usuarioService.EliminarUsuarioPermanente(id);
    return true;
  }
}
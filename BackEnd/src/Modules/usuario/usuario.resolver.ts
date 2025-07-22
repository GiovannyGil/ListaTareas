import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { GqlAuthGuard } from '../auth/jwt/GqlAuthGuard.guard';

@Resolver(() => Usuario)
export class UsuarioResolver {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Mutation(() => Usuario)
  async crearUsuario(@Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput) {
    return this.usuarioService.crearUsuario(createUsuarioInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Usuario], { name: 'usuarios' })
  async buscarUsuarios(@Context() context) {
    return this.usuarioService.buscarUsuarios();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Usuario, { name: 'usuario' })
  async buscarUsuarioxID(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioService.buscarUsuarioxID(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Usuario)
  async actualizarUsuario(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput
  ) {
    return this.usuarioService.ActualizarUsuario(id, updateUsuarioInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async eliminarUsuarioSoftDelete(@Args('id', { type: () => Int }) id: number) {
    await this.usuarioService.EliminarUsuarioSoftDelete(id);
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async eliminarUsuarioPermanente(@Args('id', { type: () => Int }) id: number) {
    await this.usuarioService.EliminarUsuarioPermanente(id);
    return true;
  }
}

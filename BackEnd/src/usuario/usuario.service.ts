import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { Usuario } from './entities/usuario.entity';
import { Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async crearUsuario(createUsuarioInput: CreateUsuarioInput): Promise<Usuario> {
    try {
      
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  async buscarUsuarios(): Promise<Usuario[]> {
    try {
      const usuarios = await this.usuarioRepository.find({ where: { deletedAt: IsNull() }, relations: ['rol'] })

      if (!usuarios) { throw new NotFoundException('No se encontraron usuarios registrados.') }

      return usuarios;
    } catch (error) {
      console.error('Error al buscar los usuarios:', error);
      throw new InternalServerErrorException(`Error al buscar los usuarios: ${error.message}`);
    }
  }

  async buscarUsuarioxID(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { id, deletedAt: IsNull() }, relations: ['rol'] });

      if (!usuario) { throw new NotFoundException(`Usuario con ID ${id} no encontrado.`); }

      return usuario;
      
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      throw new ErInternalServerErrorExceptionror(`Error al buscar el usuario: ${error.message}`);
    }
  }

  async buscarUsuarioxNombreUsuario(nombreUsuario: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { nombreUsuario, deletedAt: IsNull() }, relations: ['rol'] });

      if (!usuario) { throw new NotFoundException(`Usuario con nombre de usuario ${nombreUsuario} no encontrado.`); }

      return usuario;
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      throw new InternalServerErrorException(`Error al buscar el usuario: ${error.message}`);
    }
  }

  async buscarUsuarioxCorreo(correo: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { correo, deletedAt: IsNull() }, relations: ['rol'] });

      if (!usuario) { throw new NotFoundException(`Usuario con correo ${correo} no encontrado.`); }

      return usuario;      
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      throw new InternalServerErrorException(`Error al buscar el usuario: ${error.message}`);
    }
  }

  async ActualizarUsuario(id: number, updateUsuarioInput: UpdateUsuarioInput) {
    try {
      
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw new InternalServerErrorException(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  async cambiorClaveUsuario(id: number, clave: string) {
    try {
      
    } catch (error) {
      console.log('Error al cambiar la clave del usuario', error);
      throw new InternalServerErrorException(`Error al cambiar la clave del usuario: ${error.message}`);
    }
  }

  async EliminarUsuarioSoftDelete(id: number) {
    try {
      
    } catch (error) {
      console.error('Error al eliminar el usuario permanentemente:', error);
      throw new InternalServerErrorException(`Error al eliminar el usuario: ${error.message}`);
    }
  }

  async EliminarUsuarioPermanente(id: number) {
    try {
      
    } catch (error) {
      console.error('Error al eliminar el usuario permanentemente:', error);
      throw new InternalServerErrorException(`Error al eliminar el usuario: ${error.message}`);
    }
  }
}

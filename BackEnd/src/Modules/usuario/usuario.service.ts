import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { Usuario } from './entities/usuario.entity';
import { Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, LessThan, Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async crearUsuario(createUsuarioInput: CreateUsuarioInput): Promise<Usuario> {
    try {
      // obtener los datos del usuario -> payload
      const { rolId, clave, ...usuarioData } = createUsuarioInput

      // Buscar el rol y verificar si existe
      const rol = await this.roleRepository.findOne({ where: { id: rolId, deletedAt: IsNull() } });

      // Si no existe el rol, lanzar una excepción de tipo BadRequestException
      if (!rol) throw new NotFoundException(`El rol con ID ${rolId} no existe`)


      // verificar que no esten vacios
      if (usuarioData === null || !usuarioData) { throw new NotFoundException(`algo sucedio, no se encontraron los datos del usuario`) }

      // encriptar la contraseña
      const saltos = await bcrypt.genSalt(10)
      const encriptadoClave = await bcrypt.hash(clave, saltos)

      //crear el usuario
      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        clave: encriptadoClave,
        rol
      })

      // controlar si el usuario no se creo
      if (!usuario) { throw new NotFoundException(`algo sucedio , no se pudo crear el usuario`) }

      // guardar el usuario
      return await this.usuarioRepository.save(usuario)
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
      throw new InternalServerErrorException(`Error al buscar el usuario: ${error.message}`);
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

  async ActualizarUsuario(id: number, updateUsuarioInput: UpdateUsuarioInput): Promise<Usuario> {
    try {
      const { rolId, ...updateData } = updateUsuarioInput;

      // Buscar el usuario por ID
      const usuario = await this.usuarioRepository.findOne({
        where: { id, deletedAt: IsNull() },
        relations: ['rol'],
      });

      if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);

      // Si viene un rol nuevo, validarlo y asignarlo
      if (rolId !== undefined && rolId !== null) {
        const rol = await this.roleRepository.findOne({ where: { id: rolId, deletedAt: IsNull() } });
        if (!rol) throw new NotFoundException(`Rol con ID ${rolId} no encontrado.`);
        usuario.rol = rol;
      }

      // Asignar el resto de los datos al usuario (excepto la clave)
      Object.assign(usuario, updateData);

      // Guardar cambios
      return await this.usuarioRepository.save(usuario);

    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw new InternalServerErrorException(`Error al actualizar el usuario: ${error.message}`);
    }
  }


  async cambiarClaveUsuario(id: number, clave: string) {
    try {
      if (!clave || clave.trim() === '') {
        throw new BadRequestException('La nueva clave no puede estar vacía.');
      }

      const usuario = await this.usuarioRepository.findOne({ where: { id, deletedAt: IsNull() } });

      if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);

      const saltos = await bcrypt.genSalt(10);
      const encriptadoClave = await bcrypt.hash(clave, saltos);

      usuario.clave = encriptadoClave;

      // Esto es opcional, ya que tienes @BeforeUpdate
      usuario.updatedAt = new Date();

      await this.usuarioRepository.save(usuario);

      return { message: 'Clave actualizada correctamente' };

    } catch (error) {
      console.log('Error al cambiar la clave del usuario', error);
      throw new InternalServerErrorException(`Error al cambiar la clave del usuario: ${error.message}`);
    }
  }

  async recuperarClaveUsuario(correo: string, nombreUsuario: string, nuevaClave: string) {
    try {
      if (!correo || !nombreUsuario || !nuevaClave) {
        throw new BadRequestException('Correo, nombre de usuario y nueva clave son requeridos.');
      }

      const usuario = await this.usuarioRepository.findOne({
        where: { correo, nombreUsuario, deletedAt: IsNull() },
      });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado con el correo y nombre de usuario proporcionados.');
      }

      const saltos = await bcrypt.genSalt(10);
      const encriptadoClave = await bcrypt.hash(nuevaClave, saltos);

      usuario.clave = encriptadoClave;
      usuario.updatedAt = new Date();

      await this.usuarioRepository.save(usuario);

      return { message: 'Clave recuperada y actualizada correctamente' };
    } catch (error) {
      console.error('Error al recuperar la clave del usuario:', error);
      throw new InternalServerErrorException(`Error al recuperar la clave del usuario: ${error.message}`);
    }
  }


  async EliminarUsuarioSoftDelete(id: number) {
    try {
      // buscar el usuario por id
      const usuario = await this.usuarioRepository.findOne({
        where: { id, deletedAt: IsNull() },
      });

      // verificar si el usuario existe
      if (!usuario) throw new NotFoundException('El usuario no existe o ya fue eliminado')

      // marcar el usuario como eliminado
      usuario.deletedAt = new Date();

      // guardar los cambios
      await this.usuarioRepository.save(usuario);

      return { mensaje: "Usuario eliminado Correctamente" };
    } catch (error) {
      console.error('Error al eliminar el usuario permanentemente:', error);
      throw new InternalServerErrorException(`Error al eliminar el usuario: ${error.message}`);
    }
  }

  async EliminarUsuarioPermanente(id: number) {
    try {
      // buscar el usuario por id
      const usuario = await this.usuarioRepository.findOne({
        where: { id, deletedAt: IsNull() },
      });

      // verificar si el usuario existe
      if (!usuario) throw new NotFoundException('El usuario no existe o ya fue eliminado')

      // eliminar el usuario permanentemente
      await this.usuarioRepository.remove(usuario);

      return { mensaje: "Usuario eliminado permanentemente" };
    } catch (error) {
      console.error('Error al eliminar el usuario permanentemente:', error);
      throw new InternalServerErrorException(`Error al eliminar el usuario: ${error.message}`);
    }
  }


  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

      const usuariosParaEliminar = await this.usuarioRepository.find({
        where: {
          deletedAt: In([LessThan(thresholdDate)]), // usuarios con deletedAt anterior al límite
        },
      });

      if (usuariosParaEliminar.length > 0) {
        await this.usuarioRepository.remove(usuariosParaEliminar); // Eliminación definitiva
        console.log(`Eliminadas ${usuariosParaEliminar.length} usuarios obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar usuarios obsoletas.',
      );
    }
  }
}

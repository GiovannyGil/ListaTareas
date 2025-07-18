import { TipoUsuario } from 'src/tipo-usuario/entities/tipo-usuario.entity';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, LessThan, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TipoUsuarioService {

  constructor(
    @InjectRepository(TipoUsuario) private tipoUsuRespositorio: Repository<TipoUsuario>
  ) {}

  // metodo para verificar si el tipo-usuario existe
  async verificarExistencia(nombre: string): Promise<Boolean> {
      try {
        // buscar el tipo-usuario
        return !!(await this.tipoUsuRespositorio.findOne({ where: { nombre, deletedAt: IsNull() } }));
      } catch (error) {
        console.log('Error al verificar la existencia del Tipo-Usuario', error);
        throw new InternalServerErrorException(`Error al verificar la existencia del Tipo-Usuario: ${error.message}`);
      }
    }

  async crearTipoUsuario(createTipoUsuarioDto: CreateTipoUsuarioDto): Promise<  TipoUsuario> {
    try {
      const { nombre, descripcion, estado } = createTipoUsuarioDto;

      const VirificarExistencia = await this.verificarExistencia(nombre);
      if (VirificarExistencia) throw new NotFoundException('El tipo de usuario ya existe');

      // verficar si el tipo-usuario existe con el deletedAt not null
      const tipoUsuarioEliminado = await this.tipoUsuRespositorio.findOne({ where: { nombre, deletedAt: IsNull() } });
      if (tipoUsuarioEliminado) throw new NotFoundException('El tipo de usuario ya existe, pero fue eliminado. Por favor, restaurelo antes de crear uno nuevo.');

      const NuevoTipoUsuario = this.tipoUsuRespositorio.create({ nombre, descripcion, estado });
      if (!NuevoTipoUsuario) throw new NotFoundException('Error al crear el Tipo-Usuario');

      return await this.tipoUsuRespositorio.save(NuevoTipoUsuario);
    } catch (error) {
      console.log('Error al crear el tipo-usuario', error);
      throw new InternalServerErrorException(`Error al crear el tipo-usuario: ${error.message}`);
    }
  }

  async BuscarTipoUsuarios(): Promise<TipoUsuario[]> {
    try {
      // buscar los tipos de usuario
      const tipoUsuarios = await this.tipoUsuRespositorio.find({ where: { deletedAt: IsNull() } });

      // si no encuentra nada, devolver un array vacio
      if (!tipoUsuarios || tipoUsuarios.length === 0) throw new NotFoundException('No hay tipos de usuario registrados');

      // devolver los tipos de usuario
      return tipoUsuarios;
    } catch (error) {
      console.log('Error al buscar los tipos de usuario', error);
      throw new InternalServerErrorException(`Error al buscar los tipos de usuario: ${error.message}`);
    }
  }

  async BuscarTipoUsuarioxID(id: number): Promise<TipoUsuario> {
    try {
      // buscar el tipo de usuario por id
      const tipoUsuario = await this.tipoUsuRespositorio.findOne({ where: { id, deletedAt: IsNull() } });

      // verificar si el tipo de usuario existe
      if (!tipoUsuario) throw new NotFoundException('Tipo de usuario no encontrado');

      // devolver el tipo de usuario
      return tipoUsuario;
    } catch (error) {
      console.log('Error al buscar el tipo de usuario por ID', error);
      throw new InternalServerErrorException(`Error al buscar el tipo de usuario por ID: ${error.message}`);
    }
  }

  async BuscarTipoUsuarioxNombre(nombre: string): Promise<TipoUsuario> {
    try {
      // buscar el tipo de usuario por id
      const tipoUsuario = await this.tipoUsuRespositorio.findOne({ where: { nombre, deletedAt: IsNull() } });

      // verificar si el tipo de usuario existe
      if (!tipoUsuario) throw new NotFoundException('Tipo de usuario no encontrado');

      // devolver el tipo de usuario
      return tipoUsuario;
    } catch (error) {
      console.log('Error al buscar el tipo de usuario por nombre', error);
      throw new InternalServerErrorException(`Error al buscar el tipo de usuario por nombre: ${error.message}`);
    }
  }

  async ActualizarTipoUsuario(id: number, updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    try {
      const { nombre, descripcion, estado } = updateTipoUsuarioDto;

      // buscar el tipo de usuario por id
      const TipoUsuario = await this.BuscarTipoUsuarioxID(id);
      if (!TipoUsuario) throw new NotFoundException('Tipo de usuario no encontrado');

      // actualizar el tipo de usuario
      const tipoUsuarioActualizado = await this.tipoUsuRespositorio.save({
        ...TipoUsuario,
        nombre,
        descripcion,
        estado
      });
      if (!tipoUsuarioActualizado) throw new NotFoundException('Error al actualizar el tipo de usuario');

      return tipoUsuarioActualizado;
    } catch (error) {
      console.log('Error al actualizar el tipo de usuario', error);
      throw new InternalServerErrorException(`Error al actualizar: ${error.message}`);
    }
  }

  async EliminarTipoUsuarioSoftDelete(id: number) {
    try {
      // buscar el tipo de usuario por id
      const tipoUsuario = await this.BuscarTipoUsuarioxID(id);
      if (!tipoUsuario) throw new InternalServerErrorException('Tipo de usuario no encontrado');

      // eliminar el tipo de usuario -> asignar la fecha de eliminación
      tipoUsuario.deletedAt = new Date(); 
      await this.tipoUsuRespositorio.softDelete(id);
      return { message: 'Tipo de usuario eliminado correctamente' };
    } catch (error) {
      console.log('Error al eliminar el tipo de usuario', error);
      throw new InternalServerErrorException(`Error al eliminar el tipo de usuario: ${error.message}`);
    }
  }

  async EliminarTipoUsuarioPermanente(id: number) {
    try {
      const TipoUsuario = await this.BuscarTipoUsuarioxID(id);
      if (!TipoUsuario) throw new InternalServerErrorException('Tipo de usuario no encontrado');

      // eliminar el tipo de usuario permanentemente
      await this.tipoUsuRespositorio.remove(TipoUsuario);
      return { message: 'Tipo de usuario eliminado permanentemente' };
    } catch (error) {
      console.log('Error al eliminar el tipo de usuario permanentemente', error);
      throw new InternalServerErrorException(`Error al eliminar el tipo de usuario permanentemente: ${error.message}`);
    }
  }


  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
    async cleanDeletedRecords() {
      try {
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)
  
        const roleParaEliminar = await this.tipoUsuRespositorio.find({
          where: {
            deletedAt: In([LessThan(thresholdDate)]), // role con deletedAt anterior al límite
          },
        });
  
        if (roleParaEliminar.length > 0) {
          await this.tipoUsuRespositorio.remove(roleParaEliminar); // Eliminación definitiva
          console.log(`Eliminados ${roleParaEliminar.length} tipoUsuarios obsoletos.`);
        }
      } catch (error) {
        console.error('Error al limpiar registros eliminados:', error);
        throw new InternalServerErrorException(`Error al limpiar registros eliminados: ${error.message}`);
      }
    }
}

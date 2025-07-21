import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTareaInput } from './dto/create-tarea.input';
import { UpdateTareaInput } from './dto/update-tarea.input';
import { Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { In, IsNull, LessThan, Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TareasService {

  constructor(
    @InjectRepository(Tarea) private tareaRepository: Repository<Tarea>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async crearTarea(createTareaInput: CreateTareaInput) {
    try {
      const { usuarioId, ...tareaData } = createTareaInput;

      // buscar el usuario por ID
      const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId, deletedAt: IsNull() } });

      // validar si existe el usuario
      if (!usuario) throw new BadRequestException(`No se encontró el usuario con ID ${usuarioId}`);

      const nuevaTarea = this.tareaRepository.create({ ...tareaData, usuario });

      return await this.tareaRepository.save(nuevaTarea);
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      throw new InternalServerErrorException(`Error al crear la tarea: ${error.message}`);
    }
  }

  async buscarTareas(): Promise<Tarea[]> {
    try {
      const tareas = await this.tareaRepository.find({ where: { deletedAt: IsNull() } });

      // validar si hay tareas
      if (!tareas) throw new BadRequestException('No se encontraron tareas');

      return tareas;
    } catch (error) {
      console.error('Error al buscar las tareas:', error);
      throw new InternalServerErrorException(`Error al buscar las tareas: ${error.message}`);
    }
  }

  async buscarTareaxID(id: number): Promise<Tarea> {
    try {
      const tarea = await this.tareaRepository.findOne({ where: { id, deletedAt: IsNull() } });

      // validar si existe la tarea
      if (!tarea) throw new BadRequestException(`No se encontró la tarea con ID ${id}`);

      return tarea;
    } catch (error) {
      console.error('Error al buscar la tarea por ID:', error);
      throw new InternalServerErrorException(`Error al buscar la tarea con ID ${id}: ${error.message}`);
    }
  }

  // buscar tareas por usuario -> id/nombreUsuario del usuario
  async buscarTareasPorUsuario(usuarioId: number): Promise<Tarea[]> {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId, deletedAt: IsNull() } });

      // validar si existe el usuario
      if (!usuario) throw new BadRequestException(`No se encontró el usuario con ID ${usuarioId}`);

      const tareas = await this.tareaRepository.find({ where: { usuario, deletedAt: IsNull() } });

      return tareas;
    } catch (error) {
      console.error('Error al buscar las tareas por usuario:', error);
      throw new InternalServerErrorException(`Error al buscar las tareas por usuario con ID ${usuarioId}: ${error.message}`);
    }
  }

  async actualizarTarea(id: number, updateTareaInput: UpdateTareaInput) {
    try {
      const { usuarioId, ...tareaData } = updateTareaInput;
      const tarea = await this.tareaRepository.findOne({ where: { id, deletedAt: IsNull() } });
      // validar si existe la tarea
      if (!tarea) throw new BadRequestException(`No se encontró la tarea con ID ${id}`);
      // si se proporciona un usuarioId, buscar el usuario
      if (usuarioId) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId, deletedAt: IsNull() } });
        // validar si existe el usuario
        if (!usuario) throw new BadRequestException(`No se encontró el usuario con ID ${usuarioId}`);
        tarea.usuario = usuario; // asignar el usuario a la tarea
      }
      // actualizar los campos de la tarea
      Object.assign(tarea, tareaData);
      // guardar los cambios
      return await this.tareaRepository.save(tarea);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      throw new InternalServerErrorException(`Error al actualizar la tarea con ID ${id}: ${error.message}`);
    }
  }

  async eliminarTareaSoftDelete(id: number) {
    try {
      const tarea = await this.tareaRepository.findOne({ where: { id, deletedAt: IsNull() }});

      // verificar si la tarea existe
      if (!tarea) throw new NotFoundException('La tarea no existe o ya fue eliminada');

      // marcar la tarea como eliminada
      tarea.deletedAt = new Date();

      // guardar los cambios
      await this.tareaRepository.save(tarea);

      return { mensaje: "Tarea eliminada correctamente" };
    } catch (error) {
      console.log('Error al eliminar la tarea:', error);
      throw new InternalServerErrorException(`Error al eliminar la tarea con ID ${id}: ${error.message}`);
    }
  }

  async eliminarTareaPermanente(id: number) { 
    try {
      const tarea = await this.tareaRepository.findOne({ where: { id, deletedAt: IsNull() }});

      // validar si existe la tarea
      if (!tarea) throw new BadRequestException(`No se encontró la tarea con ID ${id}`);

      // eliminar la tarea permanentemente
      await this.tareaRepository.remove(tarea);

      return { message: "Tarea eliminada permanentemente" };
    } catch (error) {
      console.error('Error al eliminar la tarea permanentemente:', error);
      throw new InternalServerErrorException(`Error al eliminar la tarea con ID ${id}: ${error.message}`);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
    async cleanDeletedRecords() {
      try {
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

        const tareasParaEliminar = await this.tareaRepository.find({
          where: {
            deletedAt: In([LessThan(thresholdDate)]), // tareas con deletedAt anterior al límite
          },
        });

        if (tareasParaEliminar.length > 0) {
          await this.tareaRepository.remove(tareasParaEliminar); // Eliminación definitiva
          console.log(`Eliminadas ${tareasParaEliminar.length} tareas obsoletas.`);
        }
      } catch (error) {
        console.error('Error al limpiar registros eliminados:', error);
        throw new InternalServerErrorException(
          'Ocurrió un error al eliminar tareas obsoletas.',
        );
      }
    }
}

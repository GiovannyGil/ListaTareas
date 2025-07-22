import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TareasService } from './tareas.service';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaInput } from './dto/create-tarea.input';
import { UpdateTareaInput } from './dto/update-tarea.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt/GqlAuthGuard.guard';

@Resolver(() => Tarea)
@UseGuards(GqlAuthGuard) // <-- Protege todos los métodos del resolver
export class TareasResolver {
  constructor(private readonly tareasService: TareasService) { }

  @Mutation(() => Tarea)
  crearTarea(@Args('createTareaInput') createTareaInput: CreateTareaInput) {
    return this.tareasService.crearTarea(createTareaInput);
  }

  @Query(() => [Tarea], { name: 'tareas' })
  buscarTareas() {
    return this.tareasService.buscarTareas();
  }

  @Query(() => Tarea, { name: 'tarea' })
  buscarTareaxID(@Args('id', { type: () => Int }) id: number) {
    return this.tareasService.buscarTareaxID(id);
  }

  @Query(() => [Tarea], { name: 'tareasPorUsuario' })
  buscarTareasPorUsuario(@Args('usuarioId', { type: () => Int }) usuarioId: number) {
    return this.tareasService.buscarTareasPorUsuario(usuarioId);
  }

  @Mutation(() => Tarea)
  actualizarTarea(@Args('updateTareaInput') updateTareaInput: UpdateTareaInput) {
    return this.tareasService.actualizarTarea(updateTareaInput.id, updateTareaInput);
  }

  @Mutation(() => Tarea)
  eliminarTareaPermanente(@Args('id', { type: () => Int }) id: number) {
    return this.tareasService.eliminarTareaPermanente(id);
  }

  @Mutation(() => Tarea)
  eliminarTareaSoftDelete(@Args('id', { type: () => Int }) id: number) {
    return this.tareasService.eliminarTareaSoftDelete(id);
  }
}
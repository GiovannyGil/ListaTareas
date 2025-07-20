import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TareasService } from './tareas.service';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaInput } from './dto/create-tarea.input';
import { UpdateTareaInput } from './dto/update-tarea.input';

@Resolver(() => Tarea)
export class TareasResolver {
  constructor(private readonly tareasService: TareasService) {}

  @Mutation(() => Tarea)
  createTarea(@Args('createTareaInput') createTareaInput: CreateTareaInput) {
    return this.tareasService.create(createTareaInput);
  }

  @Query(() => [Tarea], { name: 'tareas' })
  findAll() {
    return this.tareasService.findAll();
  }

  @Query(() => Tarea, { name: 'tarea' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tareasService.findOne(id);
  }

  @Mutation(() => Tarea)
  updateTarea(@Args('updateTareaInput') updateTareaInput: UpdateTareaInput) {
    return this.tareasService.update(updateTareaInput.id, updateTareaInput);
  }

  @Mutation(() => Tarea)
  removeTarea(@Args('id', { type: () => Int }) id: number) {
    return this.tareasService.remove(id);
  }
}

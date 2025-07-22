import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasResolver } from './tareas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea, Usuario])],
  controllers: [],
  providers: [TareasResolver, TareasService],
  exports: [TareasService],
})
export class TareasModule {}

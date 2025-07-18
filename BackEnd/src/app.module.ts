import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TipoUsuarioModule } from './tipo-usuario/tipo-usuario.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TareasModule } from './tareas/tareas.module';
import { RolesModule } from './roles/roles.module';
import ConnexionDDBB from './database/conexion';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnexionDDBB),
    ScheduleModule.forRoot(),
    AuthModule, TipoUsuarioModule, UsuarioModule, TareasModule, RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

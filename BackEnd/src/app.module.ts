import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Modules/auth/auth.module';
import { TipoUsuarioModule } from './Modules/tipo-usuario/tipo-usuario.module';
import { UsuarioModule } from './Modules/usuario/usuario.module';
import { TareasModule } from './Modules/tareas/tareas.module';
import { RolesModule } from './Modules/roles/roles.module';
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
export class AppModule { }

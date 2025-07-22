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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnexionDDBB),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
      playground: true,
      path: '/graphql',
    }),
    AuthModule, TipoUsuarioModule, UsuarioModule, TareasModule, RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
function t(arg0: { driver: any; autoSchemaFile: boolean; playground: boolean; path: string; }) {
  throw new Error('Function not implemented.');
}


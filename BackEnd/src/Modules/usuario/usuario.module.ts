import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioResolver } from './usuario.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuario } from '@/Modules/tipo-usuario/entities/tipo-usuario.entity';
import { Usuario } from './entities/usuario.entity';
import { Role } from '@/Modules/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Role, TipoUsuario])],
  controllers: [],
  providers: [UsuarioResolver, UsuarioService],
  exports: [UsuarioService, TypeOrmModule]
})
export class UsuarioModule { }

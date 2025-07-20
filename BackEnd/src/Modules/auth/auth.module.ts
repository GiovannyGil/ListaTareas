import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '@/Modules/usuario/entities/usuario.entity';
import { UsuarioModule } from '@/Modules/usuario/usuario.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RolesModule } from '@/Modules/roles/roles.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Usuario]),
    UsuarioModule,
    RolesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule { }

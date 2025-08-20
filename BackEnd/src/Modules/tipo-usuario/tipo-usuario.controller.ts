import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoUsuarioService } from './tipo-usuario.service';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';

@Controller('tipo-usuario')
export class TipoUsuarioController {
  constructor(private readonly tipoUsuarioService: TipoUsuarioService) {}

  @Post()
  crearTipoUsuario(@Body() createTipoUsuarioDto: CreateTipoUsuarioDto) {
    return this.tipoUsuarioService.crearTipoUsuario(createTipoUsuarioDto);
  }

  @Get()
  BuscarTipoUsuarios() {
    return this.tipoUsuarioService.BuscarTipoUsuarios();
  }

  @Get(':id')
  BuscarTipoUsuarioxID(@Param('id') id: string) {
    return this.tipoUsuarioService.BuscarTipoUsuarioxID(+id);
  }

  @Get('nombre/:nombre')
  BuscarTipoUsuarioxNombre(@Param('nombre') nombre: string) {
    return this.tipoUsuarioService.BuscarTipoUsuarioxNombre(nombre);
  }

  @Patch(':id')
  ActualizarTipoUsuario(@Param('id') id: string, @Body() updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    return this.tipoUsuarioService.ActualizarTipoUsuario(+id, updateTipoUsuarioDto);
  }

  @Delete(':id')
  EliminarTipoUsuarioPermanente(@Param('id') id: string) {
    return this.tipoUsuarioService.EliminarTipoUsuarioPermanente(+id);
  }

  @Delete('soft/:id')
  EliminarTipoUsuarioSoftDelete(@Param('id') id: string) {
    return this.tipoUsuarioService.EliminarTipoUsuarioSoftDelete(+id);
  }
}

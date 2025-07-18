import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Backend Proyecto Lista Tareas -> (Union de Rest API y GraphQL)';
  }
}

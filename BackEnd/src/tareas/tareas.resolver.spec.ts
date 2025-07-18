import { Test, TestingModule } from '@nestjs/testing';
import { TareasResolver } from './tareas.resolver';
import { TareasService } from './tareas.service';

describe('TareasResolver', () => {
  let resolver: TareasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TareasResolver, TareasService],
    }).compile();

    resolver = module.get<TareasResolver>(TareasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

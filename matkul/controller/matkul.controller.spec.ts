import { Test, TestingModule } from '@nestjs/testing';
import { MatkulController } from './matkul.controller';

describe('MatkulController', () => {
  let controller: MatkulController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatkulController],
    }).compile();

    controller = module.get<MatkulController>(MatkulController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

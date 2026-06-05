import { Test, TestingModule } from '@nestjs/testing';
import { TranksaksiController } from './tranksaksi.controller';
import { TranksaksiService } from './tranksaksi.service';

describe('TranksaksiController', () => {
  let controller: TranksaksiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranksaksiController],
      providers: [{ provide: TranksaksiService, useValue: {} }],
    }).compile();

    controller = module.get<TranksaksiController>(TranksaksiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

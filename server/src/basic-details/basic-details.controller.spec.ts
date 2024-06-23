import { Test, TestingModule } from '@nestjs/testing';
import { BasicDetailsController } from './basic-details.controller';
import { BasicDetailsService } from './basic-details.service';

describe('BasicDetailsController', () => {
  let controller: BasicDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicDetailsController],
      providers: [BasicDetailsService],
    }).compile();

    controller = module.get<BasicDetailsController>(BasicDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

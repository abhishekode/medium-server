import { Test, TestingModule } from '@nestjs/testing';
import { BasicDetailsService } from './basic-details.service';

describe('BasicDetailsService', () => {
  let service: BasicDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicDetailsService],
    }).compile();

    service = module.get<BasicDetailsService>(BasicDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

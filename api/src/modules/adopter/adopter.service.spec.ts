import { Test, TestingModule } from '@nestjs/testing';
import { AdopterService } from './adopter.service';

describe('AdopterService', () => {
  let service: AdopterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdopterService],
    }).compile();

    service = module.get<AdopterService>(AdopterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

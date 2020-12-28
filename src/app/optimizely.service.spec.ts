import { TestBed } from '@angular/core/testing';

import { OptimizelyService } from './optimizely.service';

describe('OptimizelyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptimizelyService = TestBed.get(OptimizelyService);
    expect(service).toBeTruthy();
  });
});

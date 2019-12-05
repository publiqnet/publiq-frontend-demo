import { TestBed } from '@angular/core/testing';

import { HelperLibService } from './helper-lib.service';

describe('HelperLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelperLibService = TestBed.get(HelperLibService);
    expect(service).toBeTruthy();
  });
});

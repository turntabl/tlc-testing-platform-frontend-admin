import { TestBed } from '@angular/core/testing';

import { CandidateUploadService } from './candidate-upload.service';

describe('CandidateUploadService', () => {
  let service: CandidateUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

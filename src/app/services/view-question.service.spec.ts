import { TestBed } from '@angular/core/testing';

import { ViewQuestionService } from './view-question.service';

describe('ViewQuestionService', () => {
  let service: ViewQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { JobDatabaseService } from './job-database.service';

describe('JobDatabaseService', () => {
  let service: JobDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

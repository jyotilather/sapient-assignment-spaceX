import { TestBed } from '@angular/core/testing';

import { DataServiceService } from './data-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: DataServiceService = TestBed.get(DataServiceService);
    expect(service).toBeTruthy();
  });

  it('should have getAllPrograms function', () => {
    const service: DataServiceService = TestBed.get(DataServiceService);
    expect(service.getAllPrograms).toBeTruthy();
  });

  it('should have getSelectedPrograms function', () => {
    const service: DataServiceService = TestBed.get(DataServiceService);
    expect(service.getSelectedPrograms).toBeTruthy();
  });

  it('should have handleError function', () => {
    const service: DataServiceService = TestBed.get(DataServiceService);
    expect(service.handleError).toBeTruthy();
  });

});

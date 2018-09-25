import { TestBed, inject } from '@angular/core/testing';

import { FlickerImagesService } from './flicker-images.service';

describe('FlickerImagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlickerImagesService]
    });
  });

  it('should be created', inject([FlickerImagesService], (service: FlickerImagesService) => {
    expect(service).toBeTruthy();
  }));
});

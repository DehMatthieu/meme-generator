import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPhotoComponent } from './load-photo.component';

describe('LoadPhotoComponent', () => {
  let component: LoadPhotoComponent;
  let fixture: ComponentFixture<LoadPhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadPhotoComponent]
    });
    fixture = TestBed.createComponent(LoadPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

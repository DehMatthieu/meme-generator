import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPhotoComponent } from './my-photo.component';

describe('MyPhotoComponent', () => {
  let component: MyPhotoComponent;
  let fixture: ComponentFixture<MyPhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPhotoComponent]
    });
    fixture = TestBed.createComponent(MyPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

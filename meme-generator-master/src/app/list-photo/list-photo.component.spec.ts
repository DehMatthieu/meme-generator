import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhotoComponent } from './list-photo.component';

describe('ListPhotoComponent', () => {
  let component: ListPhotoComponent;
  let fixture: ComponentFixture<ListPhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPhotoComponent]
    });
    fixture = TestBed.createComponent(ListPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogecomapComponent } from './dialogecomap.component';

describe('DialogecomapComponent', () => {
  let component: DialogecomapComponent;
  let fixture: ComponentFixture<DialogecomapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogecomapComponent]
    });
    fixture = TestBed.createComponent(DialogecomapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

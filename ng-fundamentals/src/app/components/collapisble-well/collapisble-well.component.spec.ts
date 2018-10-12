import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapisbleWellComponent } from './collapisble-well.component';

describe('CollapisbleWellComponent', () => {
  let component: CollapisbleWellComponent;
  let fixture: ComponentFixture<CollapisbleWellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapisbleWellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapisbleWellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

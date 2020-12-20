import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonanameComponent } from './personaname.component';

describe('PersonanameComponent', () => {
  let component: PersonanameComponent;
  let fixture: ComponentFixture<PersonanameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonanameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonanameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

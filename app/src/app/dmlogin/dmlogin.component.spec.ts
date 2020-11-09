import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMLoginComponent } from './dmlogin.component';

describe('DMLoginComponent', () => {
  let component: DMLoginComponent;
  let fixture: ComponentFixture<DMLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

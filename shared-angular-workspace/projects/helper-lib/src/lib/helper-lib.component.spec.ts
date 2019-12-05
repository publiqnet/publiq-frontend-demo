import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperLibComponent } from './helper-lib.component';

describe('HelperLibComponent', () => {
  let component: HelperLibComponent;
  let fixture: ComponentFixture<HelperLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelperLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelperLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

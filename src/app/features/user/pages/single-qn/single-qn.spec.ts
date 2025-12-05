import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQn } from './single-qn';

describe('SingleQn', () => {
  let component: SingleQn;
  let fixture: ComponentFixture<SingleQn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleQn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleQn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

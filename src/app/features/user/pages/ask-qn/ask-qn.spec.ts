import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQn } from './ask-qn';

describe('AskQn', () => {
  let component: AskQn;
  let fixture: ComponentFixture<AskQn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskQn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskQn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

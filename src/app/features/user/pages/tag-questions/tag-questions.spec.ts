import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagQuestions } from './tag-questions';

describe('TagQuestions', () => {
  let component: TagQuestions;
  let fixture: ComponentFixture<TagQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagQuestions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagQuestions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

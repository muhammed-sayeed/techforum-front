import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityTab } from './community-tab';

describe('CommunityTab', () => {
  let component: CommunityTab;
  let fixture: ComponentFixture<CommunityTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListItem } from './team-list-item';

describe('TeamListItem', () => {
  let component: TeamListItem;
  let fixture: ComponentFixture<TeamListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

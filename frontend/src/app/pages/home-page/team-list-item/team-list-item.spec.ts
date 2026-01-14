import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListItem } from './team-list-item';

describe('TeamListItem', () => {
  let component: ProjectListItem;
  let fixture: ComponentFixture<ProjectListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

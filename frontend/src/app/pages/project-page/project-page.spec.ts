import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPage } from './project-page';

describe('TeamPage', () => {
  let component: ProjectPage;
  let fixture: ComponentFixture<ProjectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

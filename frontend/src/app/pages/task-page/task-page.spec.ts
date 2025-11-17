import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPage } from './task-page';
import { SortButton } from './components/sort-button/sort-button';
import { TaskItem } from './components/task-item/task-item';

describe('TaskPage', () => {
  let component: TaskPage;
  let fixture: ComponentFixture<TaskPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskPage, SortButton, TaskItem],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TaskPage } from './task-page';
import { SortButton } from './components/sort-button/sort-button';
import { TaskItem } from './components/task-item/task-item';
import { Footer } from '../../shared/layout/footer/footer';
import { Header } from '../../shared/layout/header/header';

describe('TaskPage', () => {
  let component: TaskPage;
  let fixture: ComponentFixture<TaskPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TaskPage, SortButton, TaskItem, Footer, Header],
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

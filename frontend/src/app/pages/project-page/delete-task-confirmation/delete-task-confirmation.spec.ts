import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskConfirmation } from './delete-task-confirmation';

describe('DeleteTaskConfirmation', () => {
  let component: DeleteTaskConfirmation;
  let fixture: ComponentFixture<DeleteTaskConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTaskConfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskConfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

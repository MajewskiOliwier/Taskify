import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortButton } from './sort-button';

describe('SortButton', () => {
  let component: SortButton;
  let fixture: ComponentFixture<SortButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

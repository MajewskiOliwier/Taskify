import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSection } from './register-section';

describe('RegisterSection', () => {
  let component: RegisterSection;
  let fixture: ComponentFixture<RegisterSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

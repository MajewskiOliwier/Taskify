import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRedirect } from './start-redirect';

describe('StartRedirect', () => {
  let component: StartRedirect;
  let fixture: ComponentFixture<StartRedirect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartRedirect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartRedirect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

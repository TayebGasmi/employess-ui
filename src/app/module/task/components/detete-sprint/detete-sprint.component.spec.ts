import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeteteSprintComponent } from './detete-sprint.component';

describe('DeteteSprintComponent', () => {
  let component: DeteteSprintComponent;
  let fixture: ComponentFixture<DeteteSprintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeteteSprintComponent]
    });
    fixture = TestBed.createComponent(DeteteSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

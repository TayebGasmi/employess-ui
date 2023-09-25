import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDashboardPageComponent } from './task-dashboard-page.component';

describe('TaskDashboardPageComponent', () => {
  let component: TaskDashboardPageComponent;
  let fixture: ComponentFixture<TaskDashboardPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDashboardPageComponent]
    });
    fixture = TestBed.createComponent(TaskDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

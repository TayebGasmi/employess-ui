import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPieChartComponent } from './task-pie-chart.component';

describe('TaskPieChartComponent', () => {
  let component: TaskPieChartComponent;
  let fixture: ComponentFixture<TaskPieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskPieChartComponent]
    });
    fixture = TestBed.createComponent(TaskPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

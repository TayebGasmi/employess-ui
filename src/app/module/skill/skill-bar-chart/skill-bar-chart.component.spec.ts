import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillBarChartComponent } from './skill-bar-chart.component';

describe('SkillBarChartComponent', () => {
  let component: SkillBarChartComponent;
  let fixture: ComponentFixture<SkillBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillBarChartComponent]
    });
    fixture = TestBed.createComponent(SkillBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

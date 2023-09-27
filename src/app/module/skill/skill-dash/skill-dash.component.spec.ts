import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDashComponent } from './skill-dash.component';

describe('SkillDashComponent', () => {
  let component: SkillDashComponent;
  let fixture: ComponentFixture<SkillDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillDashComponent]
    });
    fixture = TestBed.createComponent(SkillDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

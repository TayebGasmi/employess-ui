import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMySkillComponent } from './update-my-skill.component';

describe('UpdateMySkillComponent', () => {
  let component: UpdateMySkillComponent;
  let fixture: ComponentFixture<UpdateMySkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMySkillComponent]
    });
    fixture = TestBed.createComponent(UpdateMySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

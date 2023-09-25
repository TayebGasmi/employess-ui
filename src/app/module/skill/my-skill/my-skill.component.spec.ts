import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySkillComponent } from './my-skill.component';

describe('MySkillComponent', () => {
  let component: MySkillComponent;
  let fixture: ComponentFixture<MySkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MySkillComponent]
    });
    fixture = TestBed.createComponent(MySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMySkillComponent } from './delete-my-skill.component';

describe('DeleteMySkillComponent', () => {
  let component: DeleteMySkillComponent;
  let fixture: ComponentFixture<DeleteMySkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMySkillComponent]
    });
    fixture = TestBed.createComponent(DeleteMySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

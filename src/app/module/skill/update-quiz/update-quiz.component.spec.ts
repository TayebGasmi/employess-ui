import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateQuizComponent} from './update-quiz.component';

describe('UpdataQuizComponent', () => {
  let component: UpdateQuizComponent;
  let fixture: ComponentFixture<UpdateQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateQuizComponent]
    });
    fixture = TestBed.createComponent(UpdateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResponseComponent } from './quiz-response.component';

describe('QuizResponseComponent', () => {
  let component: QuizResponseComponent;
  let fixture: ComponentFixture<QuizResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizResponseComponent]
    });
    fixture = TestBed.createComponent(QuizResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

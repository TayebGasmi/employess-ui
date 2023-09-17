import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdataQuizComponent } from './updata-quiz.component';

describe('UpdataQuizComponent', () => {
  let component: UpdataQuizComponent;
  let fixture: ComponentFixture<UpdataQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdataQuizComponent]
    });
    fixture = TestBed.createComponent(UpdataQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

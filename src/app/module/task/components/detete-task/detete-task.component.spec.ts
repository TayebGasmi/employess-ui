import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeteteTaskComponent } from './detete-task.component';

describe('DeteteTaskComponent', () => {
  let component: DeteteTaskComponent;
  let fixture: ComponentFixture<DeteteTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeteteTaskComponent]
    });
    fixture = TestBed.createComponent(DeteteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

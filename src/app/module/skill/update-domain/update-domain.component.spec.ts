import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDomainComponent } from './update-domain.component';

describe('UpdateDomainComponent', () => {
  let component: UpdateDomainComponent;
  let fixture: ComponentFixture<UpdateDomainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDomainComponent]
    });
    fixture = TestBed.createComponent(UpdateDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

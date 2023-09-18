import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDomainComponent } from './delete-domain.component';

describe('DeleteDomainComponent', () => {
  let component: DeleteDomainComponent;
  let fixture: ComponentFixture<DeleteDomainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDomainComponent]
    });
    fixture = TestBed.createComponent(DeleteDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

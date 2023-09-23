import {Component, Input, ViewChild} from '@angular/core';
import {DomainForm} from "../../../core/models/DomainForm";
import {FormComponent} from "../../shared/form/form.component";
import {NotificationService} from "../../shared/notification.service";
import {DomainService} from "../../../core/service/domain.service";
import {Domain} from "../../../core/models/Domain";

@Component({
  selector: 'app-update-domain',
  templateUrl: './update-domain.component.html',
  styleUrls: ['./update-domain.component.scss']
})
export class UpdateDomainComponent {

  @Input()
  data?: Domain
  @ViewChild(FormComponent) form?: FormComponent;
  showModal = false;
  protected readonly DomainForm = DomainForm;

  constructor(private notificationService: NotificationService, private service: DomainService) {
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (this.form?.form.invalid) {
      this.notificationService.showError('Form is invalid', 'Error');
      return;
    }
    this.service.updateById(this.form?.form.value, this.data?.id || 0,).subscribe((data) => {
      this.notificationService.showSuccess('Skill updated successfully', 'Success');
      this.closeModal();
      this.service.updateData(data);
    })
  }

  openModal() {
    this.showModal = true;
  }
}

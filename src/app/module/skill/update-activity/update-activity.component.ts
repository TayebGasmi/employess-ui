import {Component, Input, ViewChild} from '@angular/core';
import {ActivityForm} from "../../../core/models/ActivityForm";
import {Domain} from "../../../core/models/Domain";
import {FormComponent} from "../../shared/form/form.component";
import {NotificationService} from "../../shared/notification.service";
import {DomainService} from "../../../core/service/domain.service";
import {ActivityService} from "../../../core/service/activity.service";

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent {

  protected readonly ActivityForm = ActivityForm;
  @Input()
  data?: Domain
  @ViewChild(FormComponent) form?: FormComponent;
  constructor(private  notificationService: NotificationService, private service: ActivityService ) {
  }
  showModal= false;

  closeModal() {
    this.showModal = false;
  }
  save() {
    if (this.form?.form.invalid) {
      this.notificationService.showError('Form is invalid', 'Error');
      return;
    }
    this.service.updateById( this.form?.form.value,this.data?.id||0,).subscribe((data) => {
      this.notificationService.showSuccess('Skill updated successfully', 'Success');
      this.closeModal();
      this.service.updateData(data);
    })
  }
  openModal() {
    this.showModal = true;
  }
}

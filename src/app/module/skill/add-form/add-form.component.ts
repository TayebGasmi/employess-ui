import {Component, Input, ViewChild} from '@angular/core';
import {NotificationService} from "../../shared/notification.service";
import {FormComponent} from "../../shared/form/form.component";
import {tap} from "rxjs";
import {FormField} from "../../../core/models/FormField";
import {BaseService} from "../../../core/service/BaseService";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent<T,I> {
  constructor(private notificationService: NotificationService, private service: BaseService<T, I>) {
  }

  @ViewChild(FormComponent) form?: FormComponent;
  @Input()
  fields! :FormField[]
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (this.form?.form.invalid) {
      this.notificationService.showError('Form is invalid', 'Error');
      return;
    }
    if (this.form?.form.valid) {
      this.service.save(this.form?.form.value).pipe(
          tap((skill) => {
                this.notificationService.showSuccess('Skill added successfully', 'Success');
                this.closeModal();
              }
          )
      )
          .subscribe()
    }
  }
}
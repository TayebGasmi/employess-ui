import {Component, Input, ViewChild} from '@angular/core';
import {BaseService} from "../../../core/service/BaseService";
import {FormComponent} from "../form/form.component";
import {FormField} from "../../../core/models/FormField";
import {NotificationService} from "../notification.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent<T,I> {
  @Input()
  service!: BaseService<T, I>
  @ViewChild(FormComponent) form?: FormComponent;
  @Input()
  fields!: FormField[]
  showModal = false;
  @Input()
  title!: string;
  @Input()
  data!: any;

  constructor(private notificationService: NotificationService) {
  }

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
      this.service.updateById(this.form?.form.value,this.data?.id).pipe(
        tap((t) => {
            this.notificationService.showSuccess('Skill added successfully', 'Success');
            this.closeModal();
            this.service.updateData(t)
          }
        )
      )
        .subscribe()
    }
  }
}

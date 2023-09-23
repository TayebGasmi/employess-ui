import {Component, ViewChild} from '@angular/core';
import {DomainForm} from "../../../core/models/DomainForm";
import {NotificationService} from "../../shared/notification.service";
import {ActivityService} from "../../../core/service/activity.service";
import {FormComponent} from "../../shared/form/form.component";
import {tap} from "rxjs";
import {DomainService} from "../../../core/service/domain.service";

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.scss']
})
export class AddDomainComponent {

    protected readonly DomainForm = DomainForm;
    constructor(private notificationService: NotificationService, private activityService: DomainService) {
    }

    @ViewChild(FormComponent) form?: FormComponent;
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
            this.activityService.save(this.form?.form.value).pipe(
                tap((activity) => {
                        this.notificationService.showSuccess('Skill added successfully', 'Success');
                        this.closeModal();
                        this.activityService.updateData(activity)
                    }
                )
            )
                .subscribe()
        }
    }
}

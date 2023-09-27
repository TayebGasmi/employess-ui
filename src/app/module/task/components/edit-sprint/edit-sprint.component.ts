import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {FormComponent} from "../../../shared/form/form.component";
import {NotificationService} from "../../../shared/notification.service";
import {TaskFrom} from "../../../../core/models/TaskFrom";
import {Sprint} from "../../../../core/models/Sprint";
import {SprintServiceService} from "../../../../core/service/sprint-service.service";
import {SprintForm} from "../../../../core/models/SprintForm";

@Component({
  selector: 'app-edit-sprint',
  templateUrl: './edit-sprint.component.html',
  styleUrls: ['./edit-sprint.component.scss']
})
export class EditSprintComponent implements OnInit{
  @Input()
  sprint?: Sprint;


  @ViewChild(FormComponent) form?: FormComponent;
  constructor(private  notificationService: NotificationService, private sprintService:SprintServiceService) {
  }
  protected readonly sprintForm = SprintForm;
  showModal= false;
  openModal(){
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
    this.sprintService.updateSprint(this.form?.form.value, this.sprint?.id ).subscribe((task) => {

      this.notificationService.showSuccess('Sprint updated successfully', 'Success');
      this.sprintService.updateData();
      this.closeModal();

    })
  }
  openModel() {
    this.showModal = true;
  }

  ngOnInit(): void {
    console.log(this.sprint);
  }
}

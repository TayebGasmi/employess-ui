import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService:MessageService) { }
  showSuccess(message: string, title?: string) {
    this.messageService.add({severity:'success', summary: title??'success', detail: message});
  }
  showError(message: string, title?: string) {
    this.messageService.add({severity:'error', summary: title??'error', detail: message});
  }
  showInfo(message: string, title?: string) {
    this.messageService.add({severity:'info', summary: title??'info', detail: message});
  }
  showWarn(message: string, title?: string) {
    this.messageService.add({severity:'warn', summary: title??'warn', detail: message});
  }
}

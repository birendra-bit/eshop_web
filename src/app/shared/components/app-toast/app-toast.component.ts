import { ToastService } from './../../services/toast.service';
import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './app-toast.component.html',
  // host: {'[class.ngb-toasts]': 'true'},
  styleUrls: ['./app-toast.component.css']
})
export class AppToastComponent {


  constructor(public toastService: ToastService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}

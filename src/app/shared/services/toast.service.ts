import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  toasts: any[] = [];

  // Push new Toasts to array with content and options
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  // Callback method to remove Toast DOM element from view
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
  showToast(isSucsess, message ){
    if( isSucsess ){
      this.show(message, { 
        classname: 'bg-success text-light', 
        delay: 5000,
        autohide: true,
        headertext: 'Successful'})
    }else{
      this.show(message, {
          classname: 'bg-danger text-light',delay: 5000,
          autohide: true,
          headertext: 'Error!!!'
        });
    }
  }
}

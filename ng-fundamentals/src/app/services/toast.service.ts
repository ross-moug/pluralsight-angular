import { Injectable } from '@angular/core';

declare let toastr;

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  success(message: string, title?: string): void {
    toastr.success(message, title);
  }

  warning(message: string, title?: string): void {
    toastr.warning(message, title);
  }

  info(message: string, title?: string): void {
    toastr.info(message, title);
  }

  error(message: string, title?: string): void {
    toastr.error(message, title);
  }
}

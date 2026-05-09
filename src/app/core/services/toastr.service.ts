import { inject, Injectable } from '@angular/core';
import { ToastOptions, ToastService } from 'ngx-signal-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private readonly toast = inject(ToastService);
  private defaultOptions: ToastOptions = {
    position: 'top-right',
    duration: 3000,
  };

  constructor() {}

  showSuccess(message: string, options?: ToastOptions) {
    this.toast.success(message, { ...this.defaultOptions, ...options });
  }

  showError(message: string, options?: ToastOptions) {
    this.toast.error(message, { ...this.defaultOptions, ...options });
  }

  showInfo(message: string, options?: ToastOptions) {
    this.toast.info(message, { ...this.defaultOptions, ...options });
  }

  showWarning(message: string, options?: ToastOptions) {
    this.toast.warning(message, { ...this.defaultOptions, ...options });
  }
}

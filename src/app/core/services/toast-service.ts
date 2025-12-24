import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = signal<string | null>(null);

  showError(msg: string) {
    this.message.set(msg);
    setTimeout(() => this.message.set(null), 4000);
  }
}

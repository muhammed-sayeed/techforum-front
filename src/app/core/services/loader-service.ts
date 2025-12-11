import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loading = signal(false);
  private requestCount = 0;

  show() {
    this.requestCount++;
    this.loading.set(true);
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.loading.set(false);
      this.requestCount = 0;
    }
  }
}

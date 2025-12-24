import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" *ngIf="toast.message()">
      {{ toast.message() }}
    </div>
  `,
  styleUrls: ['./toast.css']
})
export class ToastComponent {
  constructor(public toast: ToastService) {}
}

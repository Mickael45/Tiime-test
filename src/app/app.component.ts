import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '@services/toast.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '@components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  toastMessage: { message: string; type: 'error' | 'success' } | null = null;
  toastSubscription: Subscription | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toast$.subscribe((toast) => {
      this.toastMessage = toast;
    });
  }

  ngOnDestroy(): void {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }
}

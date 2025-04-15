import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-error-interceptor';
import { Subscription } from 'rxjs';
import { ToastService } from '@services/toast.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '@components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, ToastComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
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

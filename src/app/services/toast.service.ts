import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<{
    message: string;
    type: 'error' | 'success';
  }>();
  toast$ = this.toastSubject.asObservable();

  showToast(message: string, type: 'error' | 'success'): void {
    this.toastSubject.next({ message, type });
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() name: string = '';
  @Input() username: string = '';
  @Input() email: string = '';
  @Input() company: string = '';

  initials = '';

  ngOnInit(): void {
    this.initials = this.getInitials(this.name);
  }

  getInitials(name: string): string {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }

  generateColorFromInitials(): string {
    let hash = 0;
    for (let i = 0; i < this.initials.length; i++) {
      hash = this.initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 65%, 55%)`;
  }
}

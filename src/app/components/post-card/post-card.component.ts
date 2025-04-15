import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  @Input() title: string = '';
  @Input() body: string = '';
}

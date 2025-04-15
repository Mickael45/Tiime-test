import { Component, inject, Input, OnInit } from '@angular/core';
import { UserFormComponent } from '@components/user-form/user-form.component';
import { PostCardComponent } from '@components/post-card/post-card.component';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { Post } from '@models/post';

@Component({
  selector: 'app-user-detail',
  imports: [UserFormComponent, PostCardComponent],
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  userService = inject(UserService);
  userId: string = '';
  user: User | null = null;
  posts: Post[] = [];
  @Input() set id(value: string) {
    this.userId = value;
  }

  ngOnInit(): void {
    this.getUserById(this.userId);
    this.getPosts(this.userId);
  }

  getPosts(userId: string) {
    this.userService.getPosts(userId).subscribe((posts) => {
      this.posts = posts;
    });
  }

  getUserById(userId: string) {
    this.userService.getUserById(userId).subscribe((user) => {
      this.user = user;
    });
  }
  updateUser(user: User) {
    this.userService.updateUser(user).subscribe((user) => {
      this.user = user;
      this.getUserById(this.userId);
    });
  }
}

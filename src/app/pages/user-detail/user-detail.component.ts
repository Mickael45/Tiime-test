import { Component, inject, Input, OnInit } from '@angular/core';
import { UserFormComponent } from '@components/user-form/user-form.component';
import { PostCardComponent } from '@components/post-card/post-card.component';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { Post } from '@models/post';
import { PostCardShadowComponent } from '@components/post-card/post-card-shadow.component';
import { UserFormShadowComponent } from '@components/user-form/user-form-shadow.component';

@Component({
  selector: 'app-user-detail',
  imports: [
    UserFormComponent,
    PostCardComponent,
    PostCardShadowComponent,
    UserFormShadowComponent,
  ],
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  arePostsLoading: boolean = false;
  isUserLoading: boolean = false;
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
    this.arePostsLoading = true;
    this.userService.getPosts(userId).subscribe((posts) => {
      this.posts = posts;
      this.arePostsLoading = false;
    });
  }

  getUserById(userId: string) {
    this.isUserLoading = true;
    this.userService.getUserById(userId).subscribe((user) => {
      this.user = user;
      this.isUserLoading = false;
    });
  }
  updateUser(user: User) {
    this.userService.updateUser(user).subscribe((user) => {
      this.user = user;
      this.getUserById(this.userId);
    });
  }
}

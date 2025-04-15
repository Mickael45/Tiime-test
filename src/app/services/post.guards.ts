import { Post } from '@models/post';

export const isPost = (post: any): post is Post => {
  return (
    post &&
    typeof post === 'object' &&
    'userId' in post &&
    typeof post.userId === 'number' &&
    'id' in post &&
    typeof post.id === 'number' &&
    'title' in post &&
    typeof post.title === 'string' &&
    'body' in post &&
    typeof post.body === 'string'
  );
};

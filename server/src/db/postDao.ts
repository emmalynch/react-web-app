import config from 'config';
import fs from 'fs';
import createLogger from 'logging';
import { IPost, Post } from '../models';

const logger = createLogger('postDao');
const fileLocation = config.get<string>('fileLocation');
const posts: Post[] = [];

/* istanbul ignore next */
try {
  logger.info(`Loading data from: ${fileLocation}`);
  const data = fs.readFileSync(fileLocation, 'utf-8');
  const objs: IPost[] = JSON.parse(data);

  objs.map(obj => {
    posts.push(new Post(obj.id, obj.location, obj.time, obj.author, obj.text));
  });
} catch (error) {
  logger.error(`Could not parse data from file: ${fileLocation}`);
  throw error;
}

export function getPosts(): Post[] {
  return posts;
}

export function getPost(id: number): Post | undefined {
  return posts.find(p => p.id === id);
}

export function writePost(post: Post) {
  posts.push(post);
  savePosts();
}

export function updatePost(
  id: number,
  time: string,
  location?: string,
  author?: string,
  text?: string
): Post | undefined {
  const postToUpdate: Post | undefined = posts.find(p => p.id === id);

  if (postToUpdate) {
    const result = postToUpdate.update(time, location, author, text);
    savePosts();
    return result;
  } else {
    return undefined;
  }
}

export function savePosts() {
  fs.writeFileSync(fileLocation, JSON.stringify(posts));
}

// This presumes IDs are sequential
export const getNextId = () => {
  const maxId = Math.max(
    ...posts.map(p => {
      return p.id;
    })
  );
  return maxId + 1;
};

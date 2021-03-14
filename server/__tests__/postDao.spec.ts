/// <reference types="jest" />
/// <reference types="node" />
import { IPost, Post } from "../src/models";
import { currentTimeInSec } from "../src/utils";
import * as postDao from "../src/db/postDao";
import fs from "fs";
import { testDataFileLocation, TEST_DATA } from "./consts";


afterAll(() => {
  //replace contents of testData once all tests are finished
  fs.writeFileSync(testDataFileLocation, JSON.stringify(TEST_DATA));
});

test('PostDao should return all posts', () => {
  const posts = postDao.getPosts();
  expect(posts.length).toBe(TEST_DATA.length);
});

test('PostDao should return a specified post', () => {
  const post = postDao.getPost(1);
  expect(post).toBeDefined()
  expect(post).toMatchObject(TEST_DATA[0]);

});

test('PostDao should return the next availableId', () => {
    const nextId = TEST_DATA.length + 1;

    const result = postDao.getNextId();

    expect(result).toEqual(nextId);
});

test('PostDao should write a new post', () => {

  const newPost = new Post(postDao.getNextId(), "Dublin", currentTimeInSec(), "Jane Doe", "Post content");

  postDao.writePost(newPost);

  const result = postDao.getPost(newPost.id);

  expect(result).toBeDefined();
});

test('PostDao should update an existing post', () => {

  const id = 1;
  const time = currentTimeInSec();
  const location = "New Location";
  const author = "John Smith";
  const text = "Updated post content";

  postDao.updatePost(id, time, location, author, text);

  const updatedPost = postDao.getPost(1);

  if (updatedPost) {
    expect(updatedPost.time).toBe(time);
    expect(updatedPost.location).toBe(location);
    expect(updatedPost.author).toBe(author);
    expect(updatedPost.text).toBe(text);
  }
    expect.assertions(4);
});

test('PostDao should partially update an existing post', () => {

  const id = 2;
  const time = currentTimeInSec();
  const location = "New Location";

  postDao.updatePost(id, time, location);

  const updatedPost = postDao.getPost(1);

  if (updatedPost) {
    expect(updatedPost.time).toBe(time);
    expect(updatedPost.location).toBe(location);
  }
    expect.assertions(2);
});

test('PostDao should save posts to disk', () => {

  const initialFileContents: IPost[] = JSON.parse(fs.readFileSync(testDataFileLocation, "utf-8"));

  const newPost = new Post(postDao.getNextId(), "Dublin", currentTimeInSec(), "Jane Doe", "Post content");

  postDao.writePost(newPost);

  const newFileContents: IPost[] = JSON.parse(fs.readFileSync(testDataFileLocation, "utf-8"));
  const writtenPost = newFileContents.find((post) => post.id === newPost.id);

  expect(writtenPost).toBeDefined();
  expect(initialFileContents.length).toBeLessThan(newFileContents.length);
});

test('PostDao should return undefined when trying to update an unknown post', () => {
  const unknownId = postDao.getNextId() + 1;
  const time = currentTimeInSec();
  const result = postDao.updatePost(unknownId, time);

  expect(result).toBeUndefined();
});

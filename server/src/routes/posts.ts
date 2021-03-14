import express from 'express';
import createLogger from 'logging';

import * as postDao from '../db/postDao';
import { Post } from '../models';
import { currentTimeInSec } from '../utils';

const router = express.Router();
const logger = createLogger('posts router');

router.use(function timeLog(req, _, next) {
  logger.info(
    `${new Date()} - Received request: ${req.method} - ${req.baseUrl}${req.url}`
  );
  next();
});

router.get('/', async (_, res) => {
  res.send(postDao.getPosts());
});

router.get('/:id', async (req, res) => {
  const post = postDao.getPost(parseInt(req.params.id, 10));
  if (!post) {
    res.sendStatus(404);
  } else {
    res.send(post);
  }
});


router.post('/', async (req, res) => {
  const now = currentTimeInSec();

  if (!req.body || Object.keys(req.body).length === 0) {
    res.sendStatus(400);
  } else {
    const newPost = new Post(
      postDao.getNextId(),
      req.body.location,
      now,
      req.body.author,
      req.body.text
    );

    postDao.writePost(newPost);

    res.statusCode = 201;
    res.send(newPost);
  }
});

router.put('/:id', async (req, res) => {
              
  if (!req.params || !req.body || Object.keys(req.body).length === 0) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id, 10);
    const now = currentTimeInSec();
    const result = postDao.updatePost(
      id,
      now,
      req.body.location,
      req.body.author,
      req.body.text
    );

    if (result) {
      res.statusCode = 200;
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  }
});

export default router;

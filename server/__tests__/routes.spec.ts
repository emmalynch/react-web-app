/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="supertest" />

import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import request from "supertest";
import router from '../src/routes/posts';

import { DEFAULT_NUMBER_OF_POSTS, testDataFileLocation, TEST_DATA } from "./consts";

const app = express();
app.use(bodyParser.json());
app.use('/posts', router);

afterAll(() => {
    //replace contents of testData once all tests are finished
    fs.writeFileSync(testDataFileLocation, JSON.stringify(TEST_DATA));
  });

describe('GET /posts', () => {
    it('responds with all posts', (done) => {
        return request(app)
                .get("/posts")
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response).toBeDefined();
                    expect(response.body.length).toBe(DEFAULT_NUMBER_OF_POSTS);
                    done();
                })
                .catch(err => done(err))
    });
});

describe('GET /posts/id', () => {
    it('responds with the specified post', (done) => {
        return request(app)
                .get("/posts/1")
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response).toBeDefined();
                    expect(response.body.id).toBe(1);
                    done();
                })
                .catch(err => done(err))
    });

    it('responds with 404 for an unknown id', (done) => {
        return request(app)
                .get("/posts/100")
                .set('Accept', 'application/json')
                .expect(404)
                .then(() => {
                    done();
                })
                .catch(err => done(err))
    });
});

describe('POST /posts', () => {
    it('creates the object and returns 201', (done) => {
        return request(app)
                .post("/posts")
                .send({location: "Dublin", author: "John Smith", text: "Post content"})
                .set('Accept', 'application/json')
                .expect(201)
                .then(response => {
                    expect(response).toBeDefined();
                    expect(response.body.id).toBe(DEFAULT_NUMBER_OF_POSTS + 1);
                    expect(response.body.location).toBe("Dublin");
                    expect(response.body.author).toBe("John Smith");
                    expect(response.body.text).toBe("Post content");
                    done();
                })
                .catch(err => done(err))
    });

    it('responds with 400 when invalid data is sent', (done) => {
        return request(app)
                .post("/posts")
                .set('Accept', 'application/json')
                .expect(400)
                .then(() => {
                    done();
                })
                .catch(err => done(err))
    });
});

describe('PUT /posts/id', () => {
    it('updates the object and returns 200', (done) => {
        return request(app)
                .put("/posts/1")
                .send({location: "New Location",})
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    expect(response).toBeDefined();
                    expect(response.body.id).toBe(1);
                    expect(response.body.location).toBe("New Location");
                    done();
                })
                .catch(err => done(err))
    });

    it('responds with 404 when trying to update an unknown resource', (done) => {
        return request(app)
                .put("/posts/100")
                .send({location: "New Location",})
                .set('Accept', 'application/json')
                .expect(404)
                .then(() => {
                    done();
                })
                .catch(err => done(err))
    });


    it('responds with 400 when no body is provided', (done) => {
        return request(app)
                .put("/posts/1")
                .set('Accept', 'application/json')
                .expect(400)
                .then(() => {
                    done();
                })
                .catch(err => done(err))
    });
});
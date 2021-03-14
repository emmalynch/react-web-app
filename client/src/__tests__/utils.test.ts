import { groupPostsByKey, parseData } from "../components/utils";
import { IPost } from "../models";


test('GroupPostsByKey should group a single post correctly', () =>{
    const testPosts: IPost[] = [{
        id: 1,
        author: "Jane Doe",
        location: "Dublin",
        date: new Date().toDateString(),
        time: "12345",
        week: 1,
        text: "Post content"
    }];

    const result = groupPostsByKey(testPosts, "week");

    expect(result[testPosts[0].week].length).toBe(1);
});

test('GroupPostsByKey should group many posts correctly', () =>{
    const testPosts: IPost[] = [{
        id: 1,
        author: "Jane Doe",
        location: "Dublin",
        date: new Date().toDateString(),
        time: "12345",
        week: 1,
        text: "Post content"
    },
    {
        id: 2,
        author: "Mary Smith",
        location: "New York",
        date: new Date().toDateString(),
        time: "12345",
        week: 2,
        text: "Post content"
    },
    {
        id: 3,
        author: "John Murphy",
        location: "Dublin",
        date: new Date().toDateString(),
        time: "12345",
        week: 3,
        text: "Post content"
    }];

    const result = groupPostsByKey(testPosts, "location");

    expect(result["Dublin"].length).toBe(2);
    expect(result["New York"].length).toBe(1);
    expect(result["Dublin"][0].id).toBe(1);
    expect(result["Dublin"][1].id).toBe(3);
    expect(result["New York"][0].id).toBe(2);

});

test('GroupPostsByKey should return an empty map for unknown keys', () => {
    const emptyResult = {};

    const testPosts: IPost[] = [{
        id: 1,
        author: "Jane Doe",
        location: "Dublin",
        date: new Date().toDateString(),
        time: "12345",
        week: 1,
        text: "Post content"
    }];

    const result = groupPostsByKey(testPosts, "unknownKey");

    expect(result).toMatchObject(emptyResult);
});

test('GroupPostsByKey should gracefully handle empty arrays', () =>{
    const emptyResult = {};
    const result = groupPostsByKey([], "week");
    expect(result).toMatchObject(emptyResult);
});

test('JSON data can be parsed to an array of IPost objects', () => {
    const result = parseData(testData);
    expect(result.length).toBe(6);
    expect(result[0].id).toBe(1);
    expect(result[0].location).toBe("San Francisco");
    expect(result[0].author).toBe("Happy User");
    expect(result[0].week).toBe(11);
    expect(result[0].date).toBe("Fri Mar 15 2019");
});

const testData = [
    {
      "id": 1,
      "location": "San Francisco",
      "time": "1552657573",
      "author": "Happy User",
      "text": "Proper PDF conversion ensures that every element of your document remains just as you left it."
    },
    {
      "id": 2,
      "location": "San Francisco",
      "time": "1552571173",
      "author": "Happy User",
      "text": "The modern workplace is increasingly digital, and workflows are constantly evolving. "
    },
    {
      "id": 3,
      "location": "San Francisco",
      "time": "1552571174",
      "author": "Happy Developer",
      "text": "Digital transformation isn’t just a buzzword"
    },
    {
      "id": 4,
      "location": "Sydney",
      "time": "1552563973",
      "author": "Happy Developer",
      "text": "An expectation of digital efficiency has become the norm in our daily lives"
    },
    {
      "id": 5,
      "location": "Dublin",
      "time": "1553080742",
      "author": "Happy Manager",
      "text": "A modern PDF annotator that can accommodate all of the cooks in a very busy kitchen is what your employees really need."
    },
    {
      "id": 6,
      "location": "Dublin",
      "time": "1553099742",
      "author": "Happy Manager",
      "text": "An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time."
    }
  ]
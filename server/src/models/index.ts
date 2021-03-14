export interface IPost {
  id: number;
  location: string;
  time: string; // epoch ts in seconds
  author: string;
  text: string;
}

export class Post implements IPost {
  public readonly id: number;
  public location: string;
  public time: string; // epoch ts in seconds
  public author: string;
  public text: string;

  constructor(
    id: number,
    location: string,
    time: string,
    author: string,
    text: string
  ) {
    this.id = id;
    this.location = location;
    this.time = time;
    this.author = author;
    this.text = text;
  }

  public update(
    time: string,
    location?: string,
    author?: string,
    text?: string
  ): Post {
    this.time = time;
    if (location) {
      this.location = location;
    }
    if (author) {
      this.author = author;
    }
    if (text) {
      this.text = text;
    }
    return this;
  }
}

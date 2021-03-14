import { IPost } from "../models";
import { DateTime } from "luxon";

export function groupPostsByKey(posts: IPost[], key: string): {[key: string]: IPost[]} {
     return posts.reduce((r: any, a: any) => {
        r[a[key]] = r[a[key]] || [];
        r[a[key]].push(a);
        return r;
      }, {});

}

export function parseData(data: any[]): IPost[] {
  return data.map((elem) => {
    return {
      ...elem,
      week: DateTime.fromSeconds(parseInt(elem.time)).weekNumber,
      date: new Date(elem.time * 1000).toDateString()
    };
  });
}

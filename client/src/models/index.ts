export interface IPost {
    id: number;
    location: string;
    time: string; // epoch ts in seconds
    week: number;
    date: string;
    author: string;
    text: string;
}
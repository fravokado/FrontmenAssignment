export interface JokeMap {
    [key: number]: Joke
}

export interface Joke {
    id: number;
    joke: string;
    categories: string[];
}
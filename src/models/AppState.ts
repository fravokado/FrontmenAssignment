import  { JokeMap } from './Joke';

export default interface IAppState {
    currentJokes: JokeMap;
    favouriteJokes: JokeMap;
    timerEnabled: boolean;
}
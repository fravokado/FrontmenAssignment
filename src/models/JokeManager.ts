import  { JokeMap } from './Joke';
import { RouteComponentProps } from 'react-router-dom';

export interface JokeManagerProps extends RouteComponentProps {
}

export interface JokeListState {
    idList: number[];
    jokeMap: JokeMap;
}

export interface JokeManagerState {
    currentJokes: JokeListState;
    favouriteJokes: JokeListState;
    timerEnabled: boolean;
}
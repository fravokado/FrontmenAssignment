import  { JokeMap } from './Joke';
import { RouteComponentProps } from 'react-router-dom';

export interface JokeManagerProps extends RouteComponentProps {
}

export interface JokeManagerState {
    currentJokes: JokeMap;
    favouriteJokes: JokeMap;
    timerEnabled: boolean;
}
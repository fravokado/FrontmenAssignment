import { Joke } from './Joke';

export default interface ApiResponse {
    type: string;
    value: Joke[];
}
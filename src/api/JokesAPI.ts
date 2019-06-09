import { Joke } from '../models/Joke';
import ApiResponse from '../models/API';

const URL = 'http://api.icndb.com/jokes/random/';

export async function getRandomJokes(number: number): Promise<Joke[]> {
    let response = await fetch(URL + number.toString());
    let data: ApiResponse = await response.json();

    if (data.type === 'success' && data.value.length > 0) {
        return data.value;
    } else {
        return [];
    }
}
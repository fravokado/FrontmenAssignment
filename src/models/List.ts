import ListTypes from "./ListTypes";
import { JokeMap } from "./Joke";

export default interface ListProps {
    listTitle: string;
    listType: ListTypes;
    listItems: JokeMap;
    listItemAction(id: number): any;
}
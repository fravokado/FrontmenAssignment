import ListTypes from "./ListTypes";
import { JokeListState } from "./JokeManager";

export default interface ListProps {
    listTitle: string;
    listType: ListTypes;
    listItems: JokeListState;
    listItemAction(id: number): any;
}
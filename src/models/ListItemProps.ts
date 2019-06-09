import ListTypes from "./ListTypes";

export default interface ListItemProps {
    id: number;
    text: string;
    listType: ListTypes;
    listItemAction(id: number): any;
}
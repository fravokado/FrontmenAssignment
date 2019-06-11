import React from 'react';
import { Typography, List } from '@material-ui/core';
import ListProps from '../models/List';
import ListItemComponent from './ListItem';

const ListComponent: React.FC<ListProps> = (props) => {
    let items = [];
    for (const id of props.listItems.idList) {
        const item = props.listItems.jokeMap[id];
        items.push(
            <ListItemComponent 
                key={item.id}
                id={item.id}
                text={item.joke}
                listType={props.listType}
                listItemAction={props.listItemAction}
            />
        );
    }

    return (
        <React.Fragment>
            <Typography variant='h6' className={'listTitle'}>
                {props.listTitle}
            </Typography>
            <div className={'card'}>
                <List>
                    {items}
                </List>
            </div>
        </React.Fragment>
    );
}

export default ListComponent;

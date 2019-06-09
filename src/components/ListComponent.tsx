import React from 'react';
import { Typography, List } from '@material-ui/core';
import ListProps from '../models/ListProps';
import ListItemComponent from './ListItemComponent';

const ListComponent: React.FC<ListProps> = (props) => {
    let items = [];
    for (const item in props.listItems) {
        items.push(
            <ListItemComponent 
                key={props.listItems[item].id}
                id={props.listItems[item].id}
                text={props.listItems[item].joke}
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

import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import ListItemProps from '../models/ListItem';
import ListTypes from '../models/ListTypes';

const ListItemComponent: React.FC<ListItemProps> = (props) => {
    let icon;
    if (props.listType === ListTypes.Add) {
        icon = <Add />;
    } else if (props.listType === ListTypes.Remove) {
        icon = <Delete />;
    }
    return (
        <React.Fragment>
            <ListItem>
                <ListItemText
                    primary={props.text}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => props.listItemAction(props.id)}>
                        {icon}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
}

export default ListItemComponent;
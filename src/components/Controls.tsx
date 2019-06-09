import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import ControlsProps from '../models/Controls';

const ControlsComponent: React.FC<ControlsProps> = (props) => {
    return (
        <FormGroup row className={'controls'}>
            <Button onClick={props.fetchJokes}
                    variant='contained'
                    color='primary'>
                        Fetch 10 new jokes
            </Button>
            <FormControlLabel
                label='Enable timer'
                control={
                    <Checkbox
                        checked={props.timerEnabled}
                        onChange={e => props.handleTimer(e.target.checked)}
                    />
                }
            />
      </FormGroup>
    );
  }
  
  export default ControlsComponent;
import React, { useState } from 'react';
import { FormGroup, Typography, TextField, Button } from '@material-ui/core'
import validate from '../modules/Validation';

export const isLoggedin = ():boolean => window.localStorage.getItem('token') === '123';

const Login: React.FC<any> = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (isLoggedin()) {
        props.history.push('/jokeManager');
        return null;
    } else {
        return (
            <FormGroup className={'login'}>
                <Typography className={'loginItem'}>Username: </Typography>
                <TextField className={'loginItem'} value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
                <Typography className={'loginItem'}>Password: </Typography>
                <TextField className={'loginItem'} value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                <Button onClick={() => {
                    if (validate(username, password)){
                        window.localStorage.setItem('token', '123');
                        props.history.push('/JokeManager');
                    } else {
                        setUsername('');
                        setPassword('');
                    }
                    
                }}
                        variant='contained' color='primary'>
                    Login
                </Button>
            </FormGroup>
        );
    }
}

export default Login;
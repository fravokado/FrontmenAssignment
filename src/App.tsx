import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import JokeManager from './components/JokeManager';
import Login from './components/Login';

const App: React.FC<any> = () => {
    return (
        <Router>
            <React.Fragment>
                <Redirect from="/" to="login" />
                <Route path='/login' component={Login} />
                <Route path='/jokeManager' component={JokeManager} />
            </React.Fragment>
        </Router>
    );
}

export default App;
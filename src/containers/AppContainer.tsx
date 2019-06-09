import React from 'react';
import AppState from '../models/AppState';
import { getRandomJokes } from '../api/JokesAPI';
import { Joke, JokeMap } from '../models/Joke';
import AppProps from '../models/AppProps';
import { Grid } from '@material-ui/core';
import ControlsComponent from '../components/ControlsComponent';
import ListTypes from '../models/ListTypes';
import ListComponent from '../components/ListComponent'

const NUMBER_OF_JOKES = 10;
const STORAGE_KEY = 'favouriteList';
const TIMER_DURATION = 5000;

class AppContainer extends React.Component<AppProps, AppState> {
    interval: any;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            currentJokes: {},
            favouriteJokes: {},
            timerEnabled: false
        };
        this.interval = null;
    }

    haveSpace = (): boolean => {
        return Object.keys(this.state.favouriteJokes).length < NUMBER_OF_JOKES;
    }

    alreadyAdded = (id: number): boolean => {
        if (this.state.favouriteJokes[id]) {
            return true;
        } else {
            return false;
        };
    }

    updateFavouriteStateAndStorage = (newFavourite: JokeMap) => {
        this.setState({
            favouriteJokes: newFavourite
        });
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavourite));
    }

    addToFavourite = (id: number) => {
        if (this.haveSpace() && !this.alreadyAdded(id)) {
            const joke = this.state.currentJokes[id];
            const newFavourite = {
                ...this.state.favouriteJokes,
                [id]: {...joke}
            }
            this.updateFavouriteStateAndStorage(newFavourite);
        } else {
            if (!this.haveSpace()) window.alert('You already have max number of jokes!');
            if (this.alreadyAdded(id)) window.alert('This joke is already added!');
        }
    }

    removeFromFavourite = (id: number) => {
        let newFavourite = {...this.state.favouriteJokes};
        delete newFavourite[id];
        this.updateFavouriteStateAndStorage(newFavourite);
    }

    fetchJokes = () => {
        getRandomJokes(NUMBER_OF_JOKES)
            .then((jokes: Joke[]) => {
                let current: JokeMap = {};
                for (const joke of jokes) {
                    current[joke.id] = joke;
                }
                this.setState({
                    currentJokes: current
                });
            })
            .catch(err => console.log(err));
    }

    fetchJoke = () => {
        getRandomJokes(1)
            .then((jokes: Joke[]) => {
                const joke = jokes[0];
                const newFavourite = {
                    ...this.state.favouriteJokes,
                    [joke.id]: {...joke}
                }
                this.updateFavouriteStateAndStorage(newFavourite);
            })
            .catch(err => console.log(err));
    }

    handleTimer = (enabled: boolean) => {
        if (enabled) {
            this.interval = setInterval(() => {
                if (this.haveSpace()) {
                    this.fetchJoke();
                } else {
                    clearInterval(this.interval);
                    this.setState({timerEnabled: false});
                }
            },  TIMER_DURATION);
            this.setState({timerEnabled: true});
        } else {
            clearInterval(this.interval);
            this.setState({timerEnabled: false});
        }
    }

    componentWillMount() {
        const newFavourite = window.localStorage.getItem(STORAGE_KEY);
        if (newFavourite) {
            this.setState({
                favouriteJokes: JSON.parse(newFavourite)
            });
        }
    }

    render() {
        return(
            <div className={'root'}>
                <ControlsComponent
                    timerEnabled={this.state.timerEnabled}
                    fetchJokes={this.fetchJokes}
                    handleTimer={this.handleTimer} />
                <Grid container spacing={2} className={'lists'}>
                    <Grid item xs={12} md={6}>
                        <ListComponent
                            listTitle={'Random jokes'}
                            listType={ListTypes.Add}
                            listItems={this.state.currentJokes}
                            listItemAction={this.addToFavourite} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ListComponent
                            listTitle={'Favourite jokes'}
                            listType={ListTypes.Remove}
                            listItems={this.state.favouriteJokes}
                            listItemAction={this.removeFromFavourite} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default AppContainer;
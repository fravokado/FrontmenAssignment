import React from 'react';
import { getRandomJokes } from '../api/JokesAPI';
import { Joke, JokeMap } from '../models/Joke';
import { JokeManagerProps, JokeManagerState, JokeListState } from '../models/JokeManager';
import { Grid } from '@material-ui/core';
import ControlsComponent from './Controls';
import ListTypes from '../models/ListTypes';
import ListComponent from './List'
import { isLoggedin } from './Login'

const NUMBER_OF_JOKES = 10;
const STORAGE_KEY = 'favouriteList';
const TIMER_DURATION = 5000;

class JokeManager extends React.Component<JokeManagerProps, JokeManagerState> {
    interval: any;

    constructor(props: JokeManagerProps) {
        super(props);
        this.state = {
            currentJokes: {
                idList: [],
                jokeMap: {}
            },
            favouriteJokes: {
                idList: [],
                jokeMap: {}
            },
            timerEnabled: false
        };
        this.interval = null;
    }

    haveSpace = (): boolean => {
        return this.state.favouriteJokes.idList.length < NUMBER_OF_JOKES;
    }

    alreadyAdded = (id: number): boolean => {
        if (this.state.favouriteJokes.jokeMap[id]) {
            return true;
        } else {
            return false;
        };
    }

    appendToNewFavouriteState = (joke: Joke): JokeListState => {
        return {
            idList: [...this.state.favouriteJokes.idList, joke.id],
            jokeMap: {
                ...this.state.favouriteJokes.jokeMap,
                [joke.id]: {...joke}
            }
        };
    }

    updateFavouriteStateAndStorage = (newFavourite: JokeListState) => {
        this.setState({
            favouriteJokes: newFavourite
        });
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavourite));
    }

    addToFavourite = (id: number) => {
        if (this.haveSpace() && !this.alreadyAdded(id)) {
            const joke = this.state.currentJokes.jokeMap[id];
            this.updateFavouriteStateAndStorage(this.appendToNewFavouriteState(joke));
        } else {
            if (!this.haveSpace()) window.alert('You already have max number of jokes!');
            if (this.alreadyAdded(id)) window.alert('This joke is already added!');
        }
    }

    removeFromFavourite = (id: number) => {
        let newFavourite: JokeListState = {...this.state.favouriteJokes};
        let index = newFavourite.idList.indexOf(id);
        if (index > -1) newFavourite.idList.splice(index, 1);
        delete newFavourite.jokeMap[id];
        this.updateFavouriteStateAndStorage(newFavourite);
    }

    fetchJokes = () => {
        getRandomJokes(NUMBER_OF_JOKES)
            .then((jokes: Joke[]) => {
                let newCurrent: JokeListState = {
                    idList: [],
                    jokeMap: {}
                }
                for (const joke of jokes) {
                    newCurrent.idList.push(joke.id);
                    newCurrent.jokeMap[joke.id] = joke;
                }
                this.setState({
                    currentJokes: newCurrent
                });
            })
            .catch(err => console.log(err));
    }

    fetchJoke = () => {
        getRandomJokes(1)
            .then((jokes: Joke[]) => {
                const joke = jokes[0];
                this.updateFavouriteStateAndStorage(this.appendToNewFavouriteState(joke));
            })
            .catch(err => console.log(err));
    }

    handleTimer = (enabled: boolean) => {
        if (enabled && this.haveSpace()) {
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
            if (!this.haveSpace()) {
                window.alert('You already have max number of jokes!');
            }
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
        if (!isLoggedin()) {
            this.props.history.push('/login');
            return null;
        } else {
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
}

export default JokeManager;
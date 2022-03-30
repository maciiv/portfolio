import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface CovidState {
    countries: CovidData[],
    continents: CovidData[],
    world: CovidData[]
}

export interface CovidData {
    continent: string,
    country: string,
    year: number,
    month: number,
    day: number
    date: Date,
    cases: number,
    deaths: number,
    icu: number,
    hosp: number,
    vax: number,
    population: number,
    medianAge: number,
    gdp: number,
    life: number,
    hdi: number
}

export interface RequestCovidAction {
    type: 'REQUEST_COVID'
}

export interface ReceiveCovidCountriesAction {
    type: 'RECEIVE_COVID_COUNTRIES',
    countries: CovidData[]
}

export interface ReceiveCovidContinentsAction {
    type: 'RECEIVE_COVID_CONTINENTS',
    continents: CovidData[]
}

export interface ReceiveCovidWorldAction {
    type: 'RECEIVE_COVID_WORLD',
    world: CovidData[]
}

export type KnownAction = RequestCovidAction | ReceiveCovidCountriesAction | ReceiveCovidContinentsAction | ReceiveCovidWorldAction;

export const actionCreators = {
    requestCovidCountries: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.covid !== undefined && appState.covid.countries.length === 0) {
            fetch(`covid/countries`)
                .then(response => response.json() as Promise<CovidData[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_COVID_COUNTRIES', countries: data });
                });

            dispatch({ type: 'REQUEST_COVID' });
        }
    },
    requestCovidContinents: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.covid !== undefined && appState.covid.continents.length === 0) {
            fetch(`covid/continents`)
                .then(response => response.json() as Promise<CovidData[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_COVID_CONTINENTS', continents: data });
                });

            dispatch({ type: 'REQUEST_COVID' });
        }
    },
    requestCovidWorld: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.covid !== undefined && appState.covid.world.length === 0) {
            fetch(`covid/world`)
                .then(response => response.json() as Promise<CovidData[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_COVID_WORLD', world: transformData(data) });
                });

            dispatch({ type: 'REQUEST_COVID' });
        }
    }
}

const transformData = (data: CovidData[]): CovidData[] => {
    data.forEach(d => {
        d.date = new Date(d.date)
    });
    return data.sort((a, b) => a.date.getTime() > b.date.getTime() ? 1 : -1);
}

const unloadedState: CovidState = { countries: [], continents: [], world: [] };

export const reducer: Reducer<CovidState> = (state: CovidState | undefined, incomingAction: Action): CovidState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_COVID':
            return {
                countries: state.countries,
                continents: state.continents,
                world: state.world
            };
        case 'RECEIVE_COVID_COUNTRIES':
            return {
                countries: action.countries,
                continents: state.continents,
                world: state.world
            };
        case 'RECEIVE_COVID_CONTINENTS':
            return {
                countries: state.countries,
                continents: action.continents,
                world: state.world
            };
        case 'RECEIVE_COVID_WORLD':
            return {
                countries: state.countries,
                continents: state.continents,
                world: action.world
            };
        default:
            return state;
    }
};
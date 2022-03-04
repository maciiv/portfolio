import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface HeroState {
    isDone: boolean,
    text: string
}

export interface DisplayAction {
    type: 'DISPLAY_HERO',
    text: string,
    isDone: boolean
}

export interface WriteAction {
    type: 'WRITE_HERO',
}

export interface DeleteAction {
    type: 'DELETE_HERO'
}

export type KnownAction = DisplayAction | WriteAction | DeleteAction;

export const actionCreators = {
    writeHero: (text: string, isDone: boolean = false): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        await new Promise(r => setTimeout(r, 500));
        let letters = text.split('');
        let i = 0;
        while (i < letters.length) {
            await new Promise(r => setTimeout(r, 100));
            let appState = getState();
            dispatch({ type: 'DISPLAY_HERO', text: appState.hero.text.concat(letters[i]), isDone: isDone })
            i++
        }
    },
    deleteHero: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        await new Promise(r => setTimeout(r, 3000));
        let appState = getState();
        let letters = appState.hero.text;
        let i = letters.length;
        while (i >= 0) {
            await new Promise(r => setTimeout(r, 100));
            dispatch({ type: 'DISPLAY_HERO', text: letters.substr(0, i), isDone: false })
            i--
        }
    }
}

const unloadedState: HeroState = { isDone: false, text: "" };

export const reducer: Reducer<HeroState> = (state: HeroState | undefined, incomingAction: Action): HeroState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'DISPLAY_HERO':
            return {
                isDone: action.isDone,
                text: action.text
            };
        default:
            return state;
    }
};
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface TriviaState {
    isLoading: boolean,
    trivia: Trivia[]
}

export interface Trivia {
    category: string,
    questions: TriviaQuestions[]
}

export interface TriviaQuestions {
    question: string,
    options: TriviaOptions[]
}

export interface TriviaOptions {
    option: string,
    isCorrect: boolean
}

export interface TriviaWinners {
    user: string,
    score: number
}

export interface RequestTriviaAction {
    type: 'REQUEST_TRIVIA'
}

export interface ReceiveTriviaAction {
    type: 'RECEIVE_TRIVIA',
    trivia: Trivia[]
}

export type KnownAction = RequestTriviaAction | ReceiveTriviaAction;

export const actionCreators = {
    requestTrivia: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.trivia !== undefined && appState.trivia.trivia.length === 0) {
            fetch(`trivia`)
                .then(response => response.json() as Promise<Trivia[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRIVIA', trivia: data });
                });

            dispatch({ type: 'REQUEST_TRIVIA' });
        }
    }
}

const unloadedState: TriviaState = { isLoading: false, trivia: [] }

export const reducer: Reducer<TriviaState> = (state: TriviaState | undefined, incomingAction: Action): TriviaState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TRIVIA':
            return {
                isLoading: true,
                trivia: state.trivia
            };
        case 'RECEIVE_TRIVIA':
            return {
                isLoading: false,
                trivia: action.trivia
            };
        default:
            return state;
    }
};
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface TriviaHomeState {
    isLoading: boolean,
    trivia: Trivia[],
    userName: string
}

export interface Trivia {
    category: string,
    questions: TriviaQuestions[]
}

export interface TriviaQuestions {
    question: string
}

export interface RequestTriviaAction {
    type: 'REQUEST_TRIVIA'
}

export interface ReceiveTriviaAction {
    type: 'RECEIVE_TRIVIA',
    trivia: Trivia[]
}

export interface ReceiveUserNameAction {
    type: 'RECEIVE_USER',
    userName: string
}

export type KnownAction = RequestTriviaAction | ReceiveTriviaAction | ReceiveUserNameAction;

export const actionCreators = {
    requestTrivia: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.triviaHome !== undefined && appState.triviaHome.trivia.length === 0) {
            fetch(`trivia`)
                .then(response => response.json() as Promise<Trivia[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRIVIA', trivia: data });
                });

            dispatch({ type: 'REQUEST_TRIVIA' });
        }
    },
    receiveUserName: (userName: string) => ({ type: 'RECEIVE_USER', userName: userName } as ReceiveUserNameAction)
}

const unloadedState: TriviaHomeState = { isLoading: false, trivia: [], userName: "" }

export const reducer: Reducer<TriviaHomeState> = (state: TriviaHomeState | undefined, incomingAction: Action): TriviaHomeState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TRIVIA':
            return {
                isLoading: true,
                trivia: state.trivia,
                userName: state.userName
            };
        case 'RECEIVE_TRIVIA':
            return {
                isLoading: false,
                trivia: action.trivia,
                userName: state.userName
            };
        case 'RECEIVE_USER':
            return {
                isLoading: true,
                trivia: state.trivia,
                userName: action.userName
            }
        default:
            return state;
    }
};
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface TriviaWinnersState {
    isLoading: boolean,
    totalMinutes: number,
    totalSeconds: number,
    winners: TriviaWinners[]
}

export interface TriviaWinners {
    user: string,
    score: number
}

export interface RequestTriviaWinners {
    type: 'REQUEST_TRIVIA_WINNERS'
}

export interface ReceiveTriviaWinners {
    type: 'RECEIVE_TRIVIA_WINNERS',
    winners: TriviaWinners[],
    totalMinutes: number,
    totalSeconds: number
}

export type KnownAction = RequestTriviaWinners | ReceiveTriviaWinners;

export const actionCreators = {
    finishTrivia: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.triviaQuestions !== undefined && appState.triviaHome.userName !== "") {
            fetch(`trivia/winners`, {
                method: 'POST',
                body: JSON.stringify({ 'user': appState.triviaHome.userName, 'score': appState.triviaQuestions.score }),
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json() as Promise<TriviaWinners[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRIVIA_WINNERS', winners: data, totalMinutes: appState.timer.minutes, totalSeconds: appState.timer.seconds });
                });
            dispatch({ type: 'REQUEST_TRIVIA_WINNERS' });
        }
    }
}

const unloadedState: TriviaWinnersState = { isLoading: false, totalMinutes: 0, totalSeconds: 0, winners: [] };

export const reducer: Reducer<TriviaWinnersState> = (state: TriviaWinnersState | undefined, incomingAction: Action): TriviaWinnersState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TRIVIA_WINNERS':
            return {
                isLoading: true,
                totalMinutes: state.totalMinutes,
                totalSeconds: state.totalSeconds,
                winners: state.winners
            };
        case 'RECEIVE_TRIVIA_WINNERS':
            return {
                isLoading: false,
                totalMinutes: action.totalMinutes,
                totalSeconds: action.totalSeconds,
                winners: action.winners
            };
        default:
            return state;
    }
};
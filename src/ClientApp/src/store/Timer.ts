import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface TimerState {
    isActive: boolean,
    seconds: number,
    minutes: number
}

export interface StartTimerAction {
    type: 'START_TIMER',
    isActive: boolean,
    seconds: number,
    minutes: number
}

export interface StopTimerAction {
    type: 'STOP_TIMER'
} 

export type KnownAction = StartTimerAction | StopTimerAction;

export const actionCreators = {
    startTimer: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.timer !== undefined && appState.timer.seconds === 0 && appState.timer.minutes === 0) {
            let seconds = appState.timer.seconds;
            let minutes = appState.timer.minutes;            
            setInterval(() => {
                seconds += 1;
                console.log(seconds)
                if (seconds == 60) {
                    minutes = + 1;
                    seconds = 0;
                }
                dispatch({ type: 'START_TIMER', isActive: true, seconds: seconds, minutes: minutes });
            }, 1000);
        }
    },
    stopTimer: () => ({ type: 'STOP_TIMER' } as StopTimerAction)
}

const unloadedState: TimerState = { isActive: false, seconds: 0, minutes: 0 };

export const reducer: Reducer<TimerState> = (state: TimerState | undefined, incomingAction: Action): TimerState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'START_TIMER':
            return {
                isActive: true,
                seconds: action.seconds,
                minutes: action.minutes
            };
        case 'STOP_TIMER':
            return {
                isActive: false,
                seconds: 0,
                minutes: 0
            };
        default:
            return state;
    }
};
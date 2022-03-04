import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface SchedulerState {
    isLoading: boolean;
    schedule: Schedule[];
    motorcyclists: number;
    hasUpdate: boolean;
    update: number;
}

export interface Schedule {
    id: number,
    time: string,
    isAvailable: boolean
}

export interface RequestSchedulerAction {
    type: 'REQUEST_SCHEDULER'
}
export interface ReceiveSchedulerAction {
    type: 'RECEIVE_SCHEDULER',
    schedule: Schedule[],
    motorcyclists: number,
    hasUpdate: boolean,
    update: number
}

export interface UpdateSchedulerAction {
    type: 'UPDATE_SCHEDULER',
    update: Schedule,
    schedule: Schedule[]
}

export type KnownAction = RequestSchedulerAction | ReceiveSchedulerAction | UpdateSchedulerAction;

export const actionCreators = {
    requestScheduler: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.scheduler !== undefined && appState.scheduler.schedule.length === 0) {
            fetch(`scheduler`)
                .then(response => response.json() as Promise<Schedule[]>)
                .then(data => {
                    let notAvaliable = data.filter(c => c.isAvailable == false);
                    dispatch({ type: 'RECEIVE_SCHEDULER', schedule: data, motorcyclists: 8 - notAvaliable.length, hasUpdate: false, update: 0 });
                });

            dispatch({ type: 'REQUEST_SCHEDULER'});
        }
    },
    updateScheduler: (schedule: Schedule): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.scheduler !== undefined) {
            fetch(`scheduler/update`, {
                method: 'POST',
                body: JSON.stringify(schedule),
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json() as Promise<Schedule[]>)
                .then(data => {
                    let update = schedule.isAvailable ? 1 : -1;
                    dispatch({ type: 'RECEIVE_SCHEDULER', schedule: data, motorcyclists: appState.scheduler.motorcyclists + update, hasUpdate: true, update: update });
                });
        }
    }       
};

const unloadedState: SchedulerState = { schedule: [], isLoading: false, motorcyclists: 8, hasUpdate: false, update: 0 };

export const reducer: Reducer<SchedulerState> = (state: SchedulerState | undefined, incomingAction: Action): SchedulerState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_SCHEDULER':
            return {
                isLoading: true,
                schedule: state.schedule,
                motorcyclists: state.motorcyclists,
                hasUpdate: state.hasUpdate,
                update: state.update
            };
        case 'RECEIVE_SCHEDULER':
            return {
                isLoading: false,
                schedule: action.schedule,
                motorcyclists: action.motorcyclists,
                hasUpdate: action.hasUpdate,
                update: action.update
            };
        default:
            return state;
    }
};
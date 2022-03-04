"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestScheduler: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState.scheduler !== undefined && appState.scheduler.schedule.length === 0) {
            fetch("scheduler")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                var notAvaliable = data.filter(function (c) { return c.isAvailable == false; });
                dispatch({ type: 'RECEIVE_SCHEDULER', schedule: data, motorcyclists: 8 - notAvaliable.length, hasUpdate: false, update: 0 });
            });
            dispatch({ type: 'REQUEST_SCHEDULER' });
        }
    }; },
    updateScheduler: function (schedule) { return function (dispatch, getState) {
        var appState = getState();
        if (appState.scheduler !== undefined) {
            fetch("scheduler/update", {
                method: 'POST',
                body: JSON.stringify(schedule),
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                var update = schedule.isAvailable ? 1 : -1;
                dispatch({ type: 'RECEIVE_SCHEDULER', schedule: data, motorcyclists: appState.scheduler.motorcyclists + update, hasUpdate: true, update: update });
            });
        }
    }; }
};
var unloadedState = { schedule: [], isLoading: false, motorcyclists: 8, hasUpdate: false, update: 0 };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
exports.reducer = reducer;
//# sourceMappingURL=Scheduler.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    startTimer: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState.timer !== undefined && appState.timer.seconds === 0 && appState.timer.minutes === 0) {
            var seconds_1 = appState.timer.seconds;
            var minutes_1 = appState.timer.minutes;
            setInterval(function () {
                seconds_1 += 1;
                console.log(seconds_1);
                if (seconds_1 == 60) {
                    minutes_1 = +1;
                    seconds_1 = 0;
                }
                dispatch({ type: 'START_TIMER', isActive: true, seconds: seconds_1, minutes: minutes_1 });
            }, 1000);
        }
    }; },
    stopTimer: function () { return ({ type: 'STOP_TIMER' }); }
};
var unloadedState = { isActive: false, seconds: 0, minutes: 0 };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
exports.reducer = reducer;
//# sourceMappingURL=Timer.js.map
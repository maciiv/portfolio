"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    finishTrivia: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState.triviaQuestions !== undefined && appState.triviaHome.userName !== "") {
            fetch("trivia/winners", {
                method: 'POST',
                body: JSON.stringify({ 'user': appState.triviaHome.userName, 'score': appState.triviaQuestions.score }),
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_TRIVIA_WINNERS', winners: data, totalMinutes: appState.timer.minutes, totalSeconds: appState.timer.seconds });
            });
            dispatch({ type: 'REQUEST_TRIVIA_WINNERS' });
        }
    }; }
};
var unloadedState = { isLoading: false, totalMinutes: 0, totalSeconds: 0, winners: [] };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
exports.reducer = reducer;
//# sourceMappingURL=TriviaWinners.js.map
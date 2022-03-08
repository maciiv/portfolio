"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestTrivia: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState.triviaHome !== undefined && appState.triviaHome.trivia.length === 0) {
            fetch("trivia")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_TRIVIA', trivia: data });
            });
            dispatch({ type: 'REQUEST_TRIVIA' });
        }
    }; }
};
var unloadedState = { isLoading: false, trivia: [] };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
exports.reducer = reducer;
//# sourceMappingURL=TriviaHome.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestTriviaQuestions: function (category) { return function (dispatch, getState) {
        var appState = getState();
        if (appState.triviaQuestions !== undefined && appState.triviaQuestions.questions.length === 0) {
            fetch("trivia/questions/".concat(category))
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_TRIVIA_QUESTIONS', questions: data, currentQuestionIndex: 0, startTime: new Date() });
            });
            dispatch({ type: 'REQUEST_TRIVIA_QUESTIONS' });
        }
    }; },
    requestNextTriviaQuestion: function (isCorrect) { return function (dispatch, getState) {
        var appState = getState();
        dispatch({ type: 'NEXT_TRIVIA_QUESTION', currentQuestionIndex: appState.triviaQuestions.currentQuestionIndex + 1, score: isCorrect ? appState.triviaQuestions.score + 1 : appState.triviaQuestions.score });
    }; }
};
var unloadedState = { isLoading: false, questions: [], currentQuestionIndex: 0, startTime: new Date(), score: 0 };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_TRIVIA_QUESTIONS':
            return {
                isLoading: true,
                questions: state.questions,
                currentQuestionIndex: state.currentQuestionIndex,
                startTime: state.startTime,
                score: state.score
            };
        case 'RECEIVE_TRIVIA_QUESTIONS':
            return {
                isLoading: false,
                questions: action.questions,
                currentQuestionIndex: action.currentQuestionIndex,
                startTime: action.startTime,
                score: state.score
            };
        case 'NEXT_TRIVIA_QUESTION':
            return {
                isLoading: false,
                questions: state.questions,
                currentQuestionIndex: action.currentQuestionIndex,
                startTime: state.startTime,
                score: action.score
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=TriviaQuestions.js.map
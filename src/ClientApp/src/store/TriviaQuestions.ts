import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface TriviaQuestionsState {
    isLoading: boolean,
    questions: TriviaQuestions[],
    currentQuestionIndex: number,
    score: number
}

export interface TriviaQuestions {
    question: string,
    options: TriviaOptions[]
}

export interface TriviaOptions {
    option: string,
    isCorrect: boolean
}

export interface RequestTriviaQuestionsAction {
    type: 'REQUEST_TRIVIA_QUESTIONS'
}

export interface ReceiveTriviaQuestionsAction {
    type: 'RECEIVE_TRIVIA_QUESTIONS',
    questions: TriviaQuestions[],
    currentQuestionIndex: number,
    startTime: Date
}

export interface NextTriviaQuestionAction {
    type: 'NEXT_TRIVIA_QUESTION'
    currentQuestionIndex: number,
    score: number
}

export interface FinishTriviaAction {
    type: 'FINISH_TRIVIA'
}

export type KnownAction = RequestTriviaQuestionsAction | ReceiveTriviaQuestionsAction | NextTriviaQuestionAction | FinishTriviaAction;

export const actionCreators = {
    requestTriviaQuestions: (category: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.triviaQuestions !== undefined && appState.triviaQuestions.questions.length === 0) {
            fetch(`trivia/questions/${category}`)
                .then(response => response.json() as Promise<TriviaQuestions[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRIVIA_QUESTIONS', questions: data, currentQuestionIndex: 0, startTime: new Date() });
                });

            dispatch({ type: 'REQUEST_TRIVIA_QUESTIONS' });
        }
    },
    requestNextTriviaQuestion: (isCorrect: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        dispatch({ type: 'NEXT_TRIVIA_QUESTION', currentQuestionIndex: appState.triviaQuestions.currentQuestionIndex + 1, score: isCorrect ? appState.triviaQuestions.score + 1 : appState.triviaQuestions.score })
    }
}

const unloadedState: TriviaQuestionsState = { isLoading: false, questions: [], currentQuestionIndex: 0 , score: 0 };

export const reducer: Reducer<TriviaQuestionsState> = (state: TriviaQuestionsState | undefined, incomingAction: Action): TriviaQuestionsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TRIVIA_QUESTIONS':
            return {
                isLoading: true,
                questions: state.questions,
                currentQuestionIndex: state.currentQuestionIndex,
                score: state.score
            };
        case 'RECEIVE_TRIVIA_QUESTIONS':
            return {
                isLoading: false,
                questions: action.questions,
                currentQuestionIndex: action.currentQuestionIndex,
                score: state.score
            };
        case 'NEXT_TRIVIA_QUESTION':
            return {
                isLoading: false,
                questions: state.questions,
                currentQuestionIndex: action.currentQuestionIndex,
                score: action.score
            };
        default:
            return state;
    }
};
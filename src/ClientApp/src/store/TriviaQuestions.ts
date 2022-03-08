import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface TriviaQuestionsState {
    isLoading: boolean,
    questions: TriviaQuestions[],
    currentQuestionIndex: number,
    startTime: Date
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
    currentQuestionIndex: number
}

export type KnownAction = RequestTriviaQuestionsAction | ReceiveTriviaQuestionsAction | NextTriviaQuestionAction;

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
    requestNextTriviaQuestion: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        dispatch({ type: 'NEXT_TRIVIA_QUESTION', currentQuestionIndex: appState.triviaQuestions.currentQuestionIndex + 1 })
    }
}

const unloadedState: TriviaQuestionsState = { isLoading: false, questions: [], currentQuestionIndex: 0 , startTime: new Date() };

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
                startTime: state.startTime
            };
        case 'RECEIVE_TRIVIA_QUESTIONS':
            return {
                isLoading: false,
                questions: action.questions,
                currentQuestionIndex: action.currentQuestionIndex,
                startTime: action.startTime
            };
        case 'NEXT_TRIVIA_QUESTION':
            return {
                isLoading: false,
                questions: state.questions,
                currentQuestionIndex: action.currentQuestionIndex,
                startTime: state.startTime
            }
        default:
            return state;
    }
};
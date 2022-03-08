import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Scheduler from './Scheduler';
import * as Hero from './Hero';
import * as PortfolioItems from './PortfolioItems';
import * as TriviaHome from './TriviaHome';
import * as TriviaQuestions from './TriviaQuestions';
import * as Timer from './Timer';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    scheduler: Scheduler.SchedulerState | undefined;
    hero: Hero.HeroState | undefined;
    portfolioItems: PortfolioItems.PortfolioItemsState | undefined;
    triviaHome: TriviaHome.TriviaHomeState | undefined;
    triviaQuestions: TriviaQuestions.TriviaQuestionsState | undefined;
    timer: Timer.TimerState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    scheduler: Scheduler.reducer,
    hero: Hero.reducer,
    portfolioItems: PortfolioItems.reducer,
    triviaHome: TriviaHome.reducer,
    triviaQuestions: TriviaQuestions.reducer,
    timer: Timer.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

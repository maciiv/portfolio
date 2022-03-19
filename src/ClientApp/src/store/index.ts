import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Scheduler from './Scheduler';
import * as PortfolioItems from './PortfolioItems';
import * as Trivia from './Trivia';
import * as Covid from './Covid';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    scheduler: Scheduler.SchedulerState | undefined;
    portfolioItems: PortfolioItems.PortfolioItemsState | undefined;
    trivia: Trivia.TriviaState | undefined;
    covid: Covid.CovidState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    scheduler: Scheduler.reducer,
    portfolioItems: PortfolioItems.reducer,
    trivia: Trivia.reducer,
    covid: Covid.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

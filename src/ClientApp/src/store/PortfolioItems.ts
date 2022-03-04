import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface PortfolioItemsState {
    isLoading: boolean,
    items: PortfolioItem[],
    filteredItems: PortfolioItem[],
    filter: string | undefined
}

export interface PortfolioItem {
    name: string,
    description: string,
    imageUrl: string,
    gitHubUrl: string,
    itemUrl: string,
    filter: string
}

export interface RequestPortfolioItems {
    type: 'REQUEST_PORTFOLIO_ITEMS'
}

export interface ReceivePortfolioItems {
    type: 'RECEIVE_PORTFOLIO_ITEMS',
    items: PortfolioItem[],
    filteredItems: PortfolioItem[],
    filter: string | undefined
}

export interface FilterPortfolioItems {
    type: 'FILTER_PORTFOLIO_ITEMS',
    filteredItems: PortfolioItem[],
    filter: string | undefined
}

export type KnownAction = RequestPortfolioItems | ReceivePortfolioItems | FilterPortfolioItems;

export const actionCreators = {
    requestPortfolioItems: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.portfolioItems !== undefined && appState.portfolioItems.items.length === 0) {
            fetch(`portfolioItems`)
                .then(response => response.json() as Promise<PortfolioItem[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_PORTFOLIO_ITEMS', items: data, filteredItems: data, filter: undefined });
                })
        
            dispatch({ type: 'REQUEST_PORTFOLIO_ITEMS' });
        };
    },
    filterPortfolioItems: (filter?: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState.portfolioItems !== undefined) {
            dispatch({ type: 'FILTER_PORTFOLIO_ITEMS', filteredItems: filter !== undefined ? appState.portfolioItems.items.filter(c => c.filter == filter) : appState.portfolioItems.items, filter: filter })
        }
    }
}

const unloadedState: PortfolioItemsState = { isLoading: false, items: [], filteredItems: [], filter: "" }

export const reducer: Reducer<PortfolioItemsState> = (state: PortfolioItemsState | undefined, incomingAction: Action): PortfolioItemsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PORTFOLIO_ITEMS':
            return {
                isLoading: true,
                items: state.items,
                filteredItems: state.filteredItems,
                filter: state.filter
            };
        case 'RECEIVE_PORTFOLIO_ITEMS':
            return {
                isLoading: false,
                items: action.items,
                filteredItems: action.filteredItems,
                filter: action.filter
            };
        case 'FILTER_PORTFOLIO_ITEMS':
            return {
                isLoading: false,
                items: state.items,
                filteredItems: action.filteredItems,
                filter: action.filter
            };
        default:
            return state;
    }
};
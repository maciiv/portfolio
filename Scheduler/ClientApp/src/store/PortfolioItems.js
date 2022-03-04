"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestPortfolioItems: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState.portfolioItems !== undefined && appState.portfolioItems.items.length === 0) {
            fetch("portfolioItems")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_PORTFOLIO_ITEMS', items: data, filteredItems: data, filter: undefined });
            });
            dispatch({ type: 'REQUEST_PORTFOLIO_ITEMS' });
        }
        ;
    }; },
    filterPortfolioItems: function (filter) { return function (dispatch, getState) {
        var appState = getState();
        if (appState.portfolioItems !== undefined) {
            dispatch({ type: 'FILTER_PORTFOLIO_ITEMS', filteredItems: filter !== undefined ? appState.portfolioItems.items.filter(function (c) { return c.filter == filter; }) : appState.portfolioItems.items, filter: filter });
        }
    }; }
};
var unloadedState = { isLoading: false, items: [], filteredItems: [], filter: "" };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
exports.reducer = reducer;
//# sourceMappingURL=PortfolioItems.js.map
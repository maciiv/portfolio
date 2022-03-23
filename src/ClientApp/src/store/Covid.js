"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestCovidCountries: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState.covid !== undefined && appState.covid.countries.length === 0) {
            fetch("covid/countries")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_COVID_COUNTRIES', countries: data });
            });
            dispatch({ type: 'REQUEST_COVID' });
        }
    }; },
    requestCovidContinents: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState.covid !== undefined && appState.covid.continents.length === 0) {
            fetch("covid/continents")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_COVID_CONTINENTS', continents: data });
            });
            dispatch({ type: 'REQUEST_COVID' });
        }
    }; },
    requestCovidWorld: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState.covid !== undefined && appState.covid.world.length === 0) {
            fetch("covid/world")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_COVID_WORLD', world: transformData(data) });
            });
            dispatch({ type: 'REQUEST_COVID' });
        }
    }; }
};
var transformData = function (data) {
    data.forEach(function (d) {
        d.date = new Date(d.date);
    });
    return data.sort(function (a, b) { return a.date.getTime() > b.date.getTime() ? 1 : -1; });
};
var unloadedState = { countries: [], continents: [], world: [] };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_COVID':
            return {
                countries: state.countries,
                continents: state.continents,
                world: state.world
            };
        case 'RECEIVE_COVID_COUNTRIES':
            return {
                countries: action.countries,
                continents: state.continents,
                world: state.world
            };
        case 'RECEIVE_COVID_CONTINENTS':
            return {
                countries: state.countries,
                continents: action.continents,
                world: state.world
            };
        case 'RECEIVE_COVID_WORLD':
            return {
                countries: state.countries,
                continents: state.continents,
                world: action.world
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Covid.js.map
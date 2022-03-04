"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducers = void 0;
var WeatherForecasts = require("./WeatherForecasts");
var Counter = require("./Counter");
var Scheduler = require("./Scheduler");
var Hero = require("./Hero");
var PortfolioItems = require("./PortfolioItems");
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
exports.reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    scheduler: Scheduler.reducer,
    hero: Hero.reducer,
    portfolioItems: PortfolioItems.reducer
};
//# sourceMappingURL=index.js.map
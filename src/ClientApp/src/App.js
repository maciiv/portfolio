"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var Layout_1 = require("./components/Layout");
var Home_1 = require("./components/Home");
var Counter_1 = require("./components/Counter");
var FetchData_1 = require("./components/FetchData");
var Scheduler_1 = require("./components/scheduler/Scheduler");
var TriviaHome_1 = require("./components/trivia/TriviaHome");
var TriviaQuestions_1 = require("./components/trivia/TriviaQuestions");
var TriviaWinners_1 = require("./components/trivia/TriviaWinners");
var CovidDashboard_1 = require("./components/covid/CovidDashboard");
var CovidWorld_1 = require("./components/covid/CovidWorld");
var CovidCountries_1 = require("./components/covid/CovidCountries");
require("./assets/css/custom.css");
exports.default = (function () { return (React.createElement(Layout_1.default, null,
    React.createElement(react_router_1.Route, { exact: true, path: '/', component: Home_1.default }),
    React.createElement(react_router_1.Route, { path: '/counter', component: Counter_1.default }),
    React.createElement(react_router_1.Route, { path: '/fetch-data/:startDateIndex?', component: FetchData_1.default }),
    React.createElement(react_router_1.Route, { path: '/webapps/scheduler', component: Scheduler_1.default }),
    React.createElement(react_router_1.Route, { exact: true, path: '/webapps/trivia', component: TriviaHome_1.default }),
    React.createElement(react_router_1.Route, { exact: true, path: '/webapps/trivia/questions', component: TriviaQuestions_1.default }),
    React.createElement(react_router_1.Route, { exact: true, path: '/webapps/trivia/finish', component: TriviaWinners_1.default }),
    React.createElement(react_router_1.Route, { exact: true, path: '/visualisations/covid-dashboard', component: CovidDashboard_1.default }),
    React.createElement(react_router_1.Route, { exact: true, path: '/visualisations/covid-dashboard/world', component: CovidWorld_1.default }),
    React.createElement(react_router_1.Route, { exact: true, path: '/visualisations/covid-dashboard/countries', component: CovidCountries_1.default }))); });
//# sourceMappingURL=App.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var reactstrap_1 = require("reactstrap");
var CovidStore = require("../../store/Covid");
var d3 = require("d3");
var CovidWidget_1 = require("./CovidWidget");
var CovidWorldTimeline_1 = require("./CovidWorldTimeline");
var CovidDashboard = /** @class */ (function (_super) {
    __extends(CovidDashboard, _super);
    function CovidDashboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CovidDashboard.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    CovidDashboard.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Container, null, this.props.world.length === 0 ? React.createElement(reactstrap_1.Spinner, null) :
                React.createElement(reactstrap_1.Row, { className: "my-4" },
                    React.createElement(reactstrap_1.Col, { md: "9" },
                        React.createElement(CovidWorldTimeline_1.default, __assign({}, { location: { state: { data: this.props.world } } }))),
                    React.createElement(reactstrap_1.Col, { md: "3" },
                        React.createElement(CovidWidget_1.default, __assign({}, { location: { state: { name: "Total Cases", number: d3.sum(this.props.world.map(function (c) { return c.cases; })) } } })),
                        React.createElement(CovidWidget_1.default, __assign({}, { location: { state: { name: "Total Deaths", number: d3.sum(this.props.world.map(function (c) { return c.deaths; })) } } })),
                        React.createElement(CovidWidget_1.default, __assign({}, { location: { state: { name: "Total Hospitalisations", number: d3.sum(this.props.world.map(function (c) { return c.hosp; })) } } })))))));
    };
    CovidDashboard.prototype.ensureDataFetched = function () {
        this.props.requestCovidWorld();
    };
    return CovidDashboard;
}(React.PureComponent));
;
exports.default = (0, react_redux_1.connect)(function (state) { return state.covid; }, CovidStore.actionCreators)(CovidDashboard);
//# sourceMappingURL=CovidDashboard.js.map
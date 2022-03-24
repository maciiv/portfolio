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
var reactstrap_1 = require("reactstrap");
var d3 = require("d3");
var CovidWorldTimeline_1 = require("./CovidWorldTimeline");
var CovidWorld = /** @class */ (function (_super) {
    __extends(CovidWorld, _super);
    function CovidWorld() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            totalCases: Math.round(d3.sum(_this.props.location.state.data.map(function (c) { return c.cases; }))),
            totalHosp: Math.round(d3.sum(_this.props.location.state.data.map(function (c) { return c.hosp; }))),
            totalDeaths: Math.round(d3.sum(_this.props.location.state.data.map(function (c) { return c.deaths; }))),
            isLoading: true
        };
        return _this;
    }
    CovidWorld.prototype.componentDidMount = function () {
        this.setState({
            isLoading: false
        });
    };
    CovidWorld.prototype.render = function () {
        return (React.createElement(React.Fragment, null, this.state.isLoading ? React.createElement(reactstrap_1.Spinner, null) :
            React.createElement(reactstrap_1.Row, { className: "my-4" },
                React.createElement(reactstrap_1.Col, { md: "3" },
                    React.createElement(reactstrap_1.Card, null,
                        React.createElement(reactstrap_1.CardBody, null,
                            React.createElement(reactstrap_1.CardTitle, { className: "d-flex" },
                                React.createElement("span", { className: "mx-auto" }, this.state.totalCases)),
                            React.createElement(reactstrap_1.CardSubtitle, { className: "mb-2 text-muted d-flex" },
                                React.createElement("span", { className: "mx-auto" }, "Total Cases"))))),
                React.createElement(reactstrap_1.Col, { md: "3" },
                    React.createElement(reactstrap_1.Card, null,
                        React.createElement(reactstrap_1.CardBody, null,
                            React.createElement(reactstrap_1.CardTitle, { className: "d-flex" },
                                React.createElement("span", { className: "mx-auto" }, this.state.totalHosp)),
                            React.createElement(reactstrap_1.CardSubtitle, { className: "mb-2 text-muted d-flex" },
                                React.createElement("span", { className: "mx-auto" }, "Total Hospitalisations"))))),
                React.createElement(reactstrap_1.Col, { md: "3" },
                    React.createElement(reactstrap_1.Card, null,
                        React.createElement(reactstrap_1.CardBody, null,
                            React.createElement(reactstrap_1.CardTitle, { className: "d-flex" },
                                React.createElement("span", { className: "mx-auto" }, this.state.totalDeaths)),
                            React.createElement(reactstrap_1.CardSubtitle, { className: "mb-2 text-muted d-flex" },
                                React.createElement("span", { className: "mx-auto" }, "Total Deaths"))))),
                React.createElement(reactstrap_1.Col, { md: "3" },
                    React.createElement(reactstrap_1.Card, null,
                        React.createElement(reactstrap_1.CardBody, null,
                            React.createElement(reactstrap_1.CardTitle, { className: "d-flex" },
                                React.createElement("span", { className: "mx-auto" },
                                    Math.round(this.state.totalDeaths / this.state.totalCases * 10000) / 100,
                                    "%")),
                            React.createElement(reactstrap_1.CardSubtitle, { className: "mb-2 text-muted d-flex" },
                                React.createElement("span", { className: "mx-auto" }, "Mortality Rate"))))),
                React.createElement(reactstrap_1.Col, { md: "12", className: "mt-3" },
                    React.createElement(CovidWorldTimeline_1.default, __assign({}, { location: { state: { data: this.props.location.state.data } } }))))));
    };
    return CovidWorld;
}(React.PureComponent));
exports.default = CovidWorld;
;
//# sourceMappingURL=CovidWorld.js.map
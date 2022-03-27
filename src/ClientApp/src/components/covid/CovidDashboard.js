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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var CovidStore = require("../../store/Covid");
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
            React.createElement(reactstrap_1.Container, null,
                React.createElement(reactstrap_1.Row, { className: "my-4" },
                    this.props.world.length === 0 ? React.createElement(reactstrap_1.Spinner, null) :
                        React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex my-2" },
                            React.createElement(react_router_dom_1.Link, { to: { pathname: "/visualisations/covid-dashboard/world", state: { data: this.props.world } }, className: "btn btn-secondary btn-block mx-auto w-50" }, "Covid World Dashboard")),
                    this.props.countries.length === 0 ? React.createElement(reactstrap_1.Spinner, null) :
                        React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex my-2" },
                            React.createElement(react_router_dom_1.Link, { to: { pathname: "/visualisations/covid-dashboard/countries", state: { data: this.props.countries } }, className: "btn btn-secondary btn-block mx-auto w-50" }, "Covid Countries Dashboard"))))));
    };
    CovidDashboard.prototype.ensureDataFetched = function () {
        this.props.requestCovidWorld();
        this.props.requestCovidCountries();
    };
    return CovidDashboard;
}(React.PureComponent));
;
exports.default = (0, react_redux_1.connect)(function (state) { return state.covid; }, CovidStore.actionCreators)(CovidDashboard);
//# sourceMappingURL=CovidDashboard.js.map
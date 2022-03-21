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
var ContentContainer_1 = require("../d3_components/ContentContainer");
var Axis_1 = require("../d3_components/Axis");
var Circle_1 = require("../d3_components/Circle");
var Line_1 = require("../d3_components/Line");
var Area_1 = require("../d3_components/Area");
var CovidWorldTimeline = /** @class */ (function (_super) {
    __extends(CovidWorldTimeline, _super);
    function CovidWorldTimeline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.state = {
            width: 0,
            height: 0,
            margin: { top: 10, right: 30, bottom: 30, left: 80 },
            scaleX: {},
            scaleYCases: {},
            scaleYHosp: {},
            scaleYDeaths: {},
            isLoading: true
        };
        return _this;
    }
    CovidWorldTimeline.prototype.componentDidMount = function () {
        this.renderTimeline();
    };
    CovidWorldTimeline.prototype.renderTimeline = function () {
        if (this.ref.current === null)
            return;
        var width = this.ref.current.getBoundingClientRect().width - this.state.margin.left - this.state.margin.right;
        var height = this.ref.current.getBoundingClientRect().height - this.state.margin.top - this.state.margin.bottom;
        this.setState({
            width: width,
            height: height,
            scaleX: d3.scaleTime()
                .domain(d3.extent(this.props.location.state.data.map(function (d) { return new Date(d.date); })))
                .range([0, width]),
            scaleYCases: d3.scaleLinear()
                .domain([0, d3.max(this.props.location.state.data, function (d) { return d.cases; })])
                .range([height / 3, 0]),
            scaleYHosp: d3.scaleLinear()
                .domain([0, d3.max(this.props.location.state.data, function (d) { return d.hosp; })])
                .range([height * 2 / 3, height / 3]),
            scaleYDeaths: d3.scaleLinear()
                .domain([0, d3.max(this.props.location.state.data, function (d) { return d.deaths; })])
                .range([height, height * 2 / 3]),
            isLoading: false
        });
    };
    CovidWorldTimeline.prototype.render = function () {
        var _this = this;
        return (React.createElement(reactstrap_1.Card, null,
            React.createElement(reactstrap_1.CardBody, null,
                React.createElement(reactstrap_1.CardTitle, null, "World COVID-19 Cases Timeline"),
                React.createElement(reactstrap_1.CardSubtitle, null),
                React.createElement("div", { ref: this.ref, style: { width: "100%", height: "40vh" } }, this.state.isLoading ? React.createElement(reactstrap_1.Spinner, null) :
                    React.createElement("svg", { preserveAspectRatio: "xMinYMin meet", viewBox: "0 0 ".concat(this.state.width + this.state.margin.left + this.state.margin.right, " ").concat(this.state.height + this.state.margin.top + this.state.margin.bottom) },
                        React.createElement(ContentContainer_1.default, __assign({}, { location: { state: { width: this.state.width, height: this.state.height, translateX: this.state.margin.left, translateY: this.state.margin.top } } }),
                            this.props.location.state.data.map(function (d) {
                                return React.createElement(Circle_1.default, __assign({}, { location: { state: { scaleX: _this.state.scaleX, scaleY: _this.state.scaleYCases, dataX: new Date(d.date), dataY: d.cases, r: 5, color: "#0000b3" } } }));
                            }),
                            React.createElement(Line_1.default, __assign({}, { location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYCases, data: d3.sort(this.props.location.state.data.map(function (d) { return { x: new Date(d.date), y: d.cases }; }), function (d) { return d.x; }), color: "#0000b3" } } })),
                            React.createElement(Area_1.default, __assign({}, { location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYCases, data: d3.sort(this.props.location.state.data.map(function (d) { return { x: new Date(d.date), y: d.cases }; }), function (d) { return d.x; }), color: "#0000b3" } } })),
                            this.props.location.state.data.map(function (d) {
                                return React.createElement(Circle_1.default, __assign({}, { location: { state: { scaleX: _this.state.scaleX, scaleY: _this.state.scaleYHosp, dataX: new Date(d.date), dataY: d.hosp, r: 5, color: "#b300b3" } } }));
                            }),
                            React.createElement(Line_1.default, __assign({}, { location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYHosp, data: d3.sort(this.props.location.state.data.map(function (d) { return { x: new Date(d.date), y: d.hosp }; }), function (d) { return d.x; }), color: "#b300b3" } } })),
                            React.createElement(Area_1.default, __assign({}, { location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYHosp, data: d3.sort(this.props.location.state.data.map(function (d) { return { x: new Date(d.date), y: d.hosp }; }), function (d) { return d.x; }), color: "#b300b3" } } })),
                            this.props.location.state.data.map(function (d) {
                                return React.createElement(Circle_1.default, __assign({}, { location: { state: { scaleX: _this.state.scaleX, scaleY: _this.state.scaleYDeaths, dataX: new Date(d.date), dataY: d.deaths, r: 5, color: "#b30000" } } }));
                            }),
                            React.createElement(Line_1.default, __assign({}, { location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYDeaths, data: d3.sort(this.props.location.state.data.map(function (d) { return { x: new Date(d.date), y: d.deaths }; }), function (d) { return d.x; }), color: "#b30000" } } })),
                            React.createElement(Area_1.default, __assign({}, { location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYDeaths, data: d3.sort(this.props.location.state.data.map(function (d) { return { x: new Date(d.date), y: d.deaths }; }), function (d) { return d.x; }), color: "#b30000" } } }))),
                        React.createElement(Axis_1.default, __assign({}, { location: { state: { type: "left", translateX: this.state.margin.left, translateY: this.state.margin.top, ticks: 4, scale: this.state.scaleYCases } } })),
                        React.createElement(Axis_1.default, __assign({}, { location: { state: { type: "left", translateX: this.state.margin.left, translateY: this.state.margin.top, ticks: 4, scale: this.state.scaleYHosp } } })),
                        React.createElement(Axis_1.default, __assign({}, { location: { state: { type: "left", translateX: this.state.margin.left, translateY: this.state.margin.top, ticks: 4, scale: this.state.scaleYDeaths } } })),
                        React.createElement(Axis_1.default, __assign({}, { location: { state: { type: "bottom", translateX: this.state.margin.left, translateY: this.state.height + this.state.margin.top, scale: this.state.scaleX } } })))))));
    };
    return CovidWorldTimeline;
}(React.PureComponent));
exports.default = CovidWorldTimeline;
//# sourceMappingURL=CovidWorldTimeline.js.map
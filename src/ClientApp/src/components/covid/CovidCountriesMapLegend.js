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
var d3 = require("d3");
var Axis_1 = require("../d3_components/Axis");
var CovidCountriesMapLegend = /** @class */ (function (_super) {
    __extends(CovidCountriesMapLegend, _super);
    function CovidCountriesMapLegend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            range: d3.range(10).map(function (d) { return { color: _this.props.location.state.color(d / 10), value: d }; }),
            scale: d3.scaleLinear()
                .domain([0, _this.props.location.state.max])
                .range([_this.props.location.state.height, 0])
        };
        return _this;
    }
    CovidCountriesMapLegend.prototype.componentDidMount = function () {
        this.renderLegend();
    };
    CovidCountriesMapLegend.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (prevProps.location.state.color !== this.props.location.state.color) {
            this.setState({
                range: d3.range(10).map(function (d) { return { color: _this.props.location.state.color(d / 10), value: d }; }),
                scale: this.state.scale.domain([0, this.props.location.state.max])
            });
        }
        this.renderLegend();
    };
    CovidCountriesMapLegend.prototype.renderLegend = function () {
        d3.select("#legendGradient")
            .selectAll("stop")
            .data(this.state.range)
            .join(function (enter) { return enter.append("stop")
            .attr("offset", function (d) { return (d.value / 10 * 100) + "%"; })
            .attr("stop-color", function (d) { return d.color; }); }, function (update) { return update.attr("offset", function (d) { return (d.value / 10 * 100) + "%"; })
            .attr("stop-color", function (d) { return d.color; }); }, function (exit) { return exit; });
    };
    CovidCountriesMapLegend.prototype.render = function () {
        return (React.createElement("g", { transform: "translate(".concat(this.props.location.state.translateX, ", 0)") },
            React.createElement("g", null,
                React.createElement("rect", { width: "20", height: this.props.location.state.height, style: { "fill": 'url("#legendGradient")' } })),
            React.createElement(Axis_1.default, __assign({}, {
                location: {
                    state: {
                        type: "left",
                        translateX: 0,
                        translateY: 0,
                        ticks: 10,
                        scale: this.state.scale
                    }
                }
            })),
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "legendGradient", x1: "0%", y1: "100%", x2: "0%", y2: "0%" }))));
    };
    return CovidCountriesMapLegend;
}(React.PureComponent));
exports.default = CovidCountriesMapLegend;
//# sourceMappingURL=CovidCountriesMapLegend.js.map
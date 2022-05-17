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
var d3 = require("d3");
var CustomMethods_1 = require("../../assets/js/CustomMethods");
var CovidWorldTimelineOverlay = /** @class */ (function (_super) {
    __extends(CovidWorldTimelineOverlay, _super);
    function CovidWorldTimelineOverlay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refTooltipContent = React.createRef();
        _this.refCircleCases = React.createRef();
        _this.refCircleHosp = React.createRef();
        _this.refCircleDeaths = React.createRef();
        _this.refCircleVax = React.createRef();
        _this.refContentCases = React.createRef();
        _this.refContentHosp = React.createRef();
        _this.refContentDeaths = React.createRef();
        _this.refContentVax = React.createRef();
        _this.state = {
            isOn: false,
            position: new CustomMethods_1.PositionTooltip()
        };
        return _this;
    }
    CovidWorldTimelineOverlay.prototype.getPosition = function (e) {
        var scaledPosition = this.scalePosition(e);
        this.renderLine(scaledPosition.x);
        this.renderCircle(this.refCircleCases.current, scaledPosition.x, scaledPosition.yCases);
        this.renderCircle(this.refCircleHosp.current, scaledPosition.x, scaledPosition.yHosp);
        this.renderCircle(this.refCircleDeaths.current, scaledPosition.x, scaledPosition.yDeaths);
        this.renderCircle(this.refCircleVax.current, scaledPosition.x, scaledPosition.yVax);
        this.renderContent(scaledPosition.x, scaledPosition.data);
    };
    CovidWorldTimelineOverlay.prototype.scalePosition = function (e) {
        var positionX = this.props.location.state.scaleX.invert(d3.pointer(e)[0]);
        var bisect = d3.bisector(function (d) { return d.date; }).left;
        var i = bisect(this.props.location.state.data, positionX);
        var x = this.props.location.state.scaleX(this.props.location.state.data[i].date);
        var yCases = this.props.location.state.scaleYCases(this.props.location.state.data[i].cases);
        var yHosp = this.props.location.state.scaleYHosp(this.props.location.state.data[i].hosp);
        var yDeaths = this.props.location.state.scaleYDeaths(this.props.location.state.data[i].deaths);
        var yVax = this.props.location.state.scaleYVax(this.props.location.state.data[i].vax);
        return {
            x: x,
            yCases: yCases,
            yHosp: yHosp,
            yDeaths: yDeaths,
            yVax: yVax,
            data: this.props.location.state.data[i]
        };
    };
    CovidWorldTimelineOverlay.prototype.renderLine = function (x) {
        d3.select(".tooltip-line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", this.props.location.state.height)
            .style("stroke", "black");
    };
    CovidWorldTimelineOverlay.prototype.renderCircle = function (ref, x, y) {
        d3.select(ref)
            .attr("cx", x)
            .attr("cy", y);
    };
    CovidWorldTimelineOverlay.prototype.renderContent = function (x, data) {
        d3.select(".content-title")
            .text(d3.timeFormat("%b %d, %Y")(data.date));
        d3.select(".content")
            .attr("transform", "translate(10, 15)");
        d3.select(this.refContentCases.current)
            .select(".item-value")
            .text(Math.round(data.cases));
        d3.select(this.refContentHosp.current)
            .select(".item-value")
            .text("".concat(Math.round(data.hosp), " (").concat(data.cases === 0 ? 0 : Math.round(data.hosp / data.cases * 10000) / 100, "%)"));
        d3.select(this.refContentDeaths.current)
            .select(".item-value")
            .text("".concat(Math.round(data.deaths), " (").concat(data.cases === 0 ? 0 : Math.round(data.deaths / data.cases * 10000) / 100, "%)"));
        d3.select(this.refContentVax.current)
            .select(".item-value")
            .text("".concat(Math.round(data.vax)));
        d3.select(".tooltip-content")
            .attr("transform", "translate(".concat(this.state.position.translateX(x + 10, this.props.location.state.width, this.refTooltipContent), ", 30)"));
    };
    CovidWorldTimelineOverlay.prototype.render = function () {
        var _this = this;
        return (React.createElement("g", { transform: "translate(".concat(this.props.location.state.translateX, ", ").concat(this.props.location.state.translateY, ")") },
            React.createElement("g", { opacity: this.state.isOn ? 1 : 0 },
                React.createElement("line", { className: "tooltip-line" }),
                React.createElement("g", { ref: this.refTooltipContent, className: "tooltip-content" },
                    React.createElement("rect", { className: "content-background", y: -20, x: -5, width: 200, height: 90 }),
                    React.createElement("text", { className: "content-title" }),
                    React.createElement("g", { className: "content" },
                        React.createElement("g", { ref: this.refContentCases },
                            React.createElement("circle", { r: 5, fill: "#0000b3", stroke: "#0000b3" }),
                            React.createElement("text", { className: "item-name", x: 15 }, "Cases: "),
                            React.createElement("text", { className: "item-value", x: 65 })),
                        React.createElement("g", { ref: this.refContentHosp, transform: "translate(0, 15)" },
                            React.createElement("circle", { r: 5, fill: "#b300b3", stroke: "#b300b3" }),
                            React.createElement("text", { className: "item-name", x: 15 }, "Hosp: "),
                            React.createElement("text", { className: "item-value", x: 65 })),
                        React.createElement("g", { ref: this.refContentDeaths, transform: "translate(0, 30)" },
                            React.createElement("circle", { r: 5, fill: "#b30000", stroke: "#b30000" }),
                            React.createElement("text", { className: "item-name", x: 15 }, "Deaths: "),
                            React.createElement("text", { className: "item-value", x: 65 })),
                        React.createElement("g", { ref: this.refContentVax, transform: "translate(0, 45)" },
                            React.createElement("circle", { r: 5, fill: "#009933", stroke: "#009933" }),
                            React.createElement("text", { className: "item-name", x: 15 }, "Vax: "),
                            React.createElement("text", { className: "item-value", x: 65 })))),
                React.createElement("circle", { ref: this.refCircleCases, r: 5, fill: "#0000b3", stroke: "#0000b3" }),
                React.createElement("circle", { ref: this.refCircleHosp, r: 5, fill: "#b300b3", stroke: "#b300b3" }),
                React.createElement("circle", { ref: this.refCircleDeaths, r: 5, fill: "#b30000", stroke: "#b30000" }),
                React.createElement("circle", { ref: this.refCircleVax, r: 5, fill: "#009933", stroke: "#009933" })),
            React.createElement("rect", { onMouseMove: function (e) { return _this.getPosition(e); }, onMouseEnter: function () { return _this.setState({ isOn: true }); }, onMouseLeave: function () { return _this.setState({ isOn: false }); }, width: this.props.location.state.width, height: this.props.location.state.height, opacity: 0 })));
    };
    return CovidWorldTimelineOverlay;
}(React.PureComponent));
exports.default = CovidWorldTimelineOverlay;
//# sourceMappingURL=CovidWorldTimelineOverlay.js.map
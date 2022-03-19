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
var reactstrap_1 = require("reactstrap");
var d3 = require("d3");
var CovidWorldTimeline = /** @class */ (function (_super) {
    __extends(CovidWorldTimeline, _super);
    function CovidWorldTimeline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        return _this;
    }
    CovidWorldTimeline.prototype.componentDidMount = function () {
        this.renderTimeline();
    };
    CovidWorldTimeline.prototype.renderTimeline = function () {
        var margin = { top: 10, right: 30, bottom: 30, left: 60 }, height = d3.select("#world-timeline").node().getBoundingClientRect().height - margin.top - margin.bottom, width = d3.select("#world-timeline").node().getBoundingClientRect().width - margin.left - margin.right;
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(this.props.location.state.data, function (d) { return d.cases; })])
            .range([height, 0]);
        var xScale = d3.scaleTime()
            .domain(d3.extent(this.props.location.state.data.map(function (d) { return new Date(d.date); })))
            .range([0, width]);
        var svg = d3.select("#".concat(this.ref.current))
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 ".concat(width + margin.left + margin.right, " ").concat(height + margin.top + margin.bottom));
        var content = svg.append("g")
            .attr("class", "content-container")
            .attr("transform", "translate(".concat(margin.left, ", ").concat(margin.top, ")"))
            .attr("clip-path", "url(#clip-world-timeline)");
        content.append("rect")
            .attr("class", "zoom")
            .attr("width", width)
            .attr("height", height);
        content.append("clipPath")
            .attr("id", "clip-world-timeline")
            .append("rect")
            .attr("x", 1)
            .attr("width", width)
            .attr("height", height);
        svg.append("g")
            .attr("transform", "translate(".concat(margin.left, ", ").concat(height + margin.top, ")"))
            .attr("class", "x-axis")
            .call(d3.axisBottom(xScale));
        svg.append("g")
            .attr("transform", "translate(".concat(margin.left, ", ").concat(margin.top, ")"))
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale));
        content.selectAll("#cases")
            .data(this.props.location.state.data)
            .join(function (enter) { return enter.append("circle")
            .attr("id", "cases")
            .classed("circle", true)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("r", 5)
            .attr("cx", function (d) { return xScale(new Date(d.date)); })
            .attr("cy", function (d) { return yScale(d.cases); }); }, function (update) { return update; }, function (exit) { return exit; });
        content.selectAll("#deaths")
            .data(this.props.location.state.data)
            .join(function (enter) { return enter.append("circle")
            .attr("id", "deaths")
            .classed("circle", true)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("r", 5)
            .attr("cx", function (d) { return xScale(new Date(d.date)); })
            .attr("cy", function (d) { return yScale(d.deaths); }); }, function (update) { return update; }, function (exit) { return exit; });
    };
    CovidWorldTimeline.prototype.render = function () {
        return (React.createElement(reactstrap_1.Card, null,
            React.createElement(reactstrap_1.CardBody, null,
                React.createElement(reactstrap_1.CardTitle, null, "World COVID-19 Timeline"),
                React.createElement(reactstrap_1.CardSubtitle, null),
                React.createElement("div", { ref: this.ref, id: "world-timeline", style: { width: "100%", height: "40vh" } }))));
    };
    return CovidWorldTimeline;
}(React.PureComponent));
exports.default = CovidWorldTimeline;
//# sourceMappingURL=CovidWorldTimeline.js.map
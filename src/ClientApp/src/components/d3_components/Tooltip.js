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
var D3Tooltip = /** @class */ (function (_super) {
    __extends(D3Tooltip, _super);
    function D3Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        return _this;
    }
    D3Tooltip.prototype.componentDidMount = function () {
        this.renderTooltip();
    };
    D3Tooltip.prototype.componentDidUpdate = function () {
        this.renderTooltip();
    };
    D3Tooltip.prototype.renderLine = function (x) {
        d3.select(this.ref.current)
            .select(".tooltip-line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", 500)
            .style("stroke", "black");
    };
    D3Tooltip.prototype.renderTooltip = function () {
        var xInverted = this.props.location.state.scaleX.invert(this.props.location.state.position[0]);
        var bisect = d3.bisector(function (d) { return d.date; }).left;
        var baseX = 0;
        this.renderLine(this.props.location.state.scaleX(xInverted));
    };
    D3Tooltip.prototype.render = function () {
        return (React.createElement("g", { ref: this.ref },
            React.createElement("line", { className: "tooltip-line" }),
            React.createElement("g", { className: "tooltip-content" },
                React.createElement("rect", { className: "content-background" }),
                React.createElement("text", { className: "content-title" }),
                React.createElement("g", { className: "content" }))));
    };
    return D3Tooltip;
}(React.PureComponent));
exports.default = D3Tooltip;
//# sourceMappingURL=Tooltip.js.map
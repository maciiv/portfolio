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
var OverlayContainer = /** @class */ (function (_super) {
    __extends(OverlayContainer, _super);
    function OverlayContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.refC1 = React.createRef();
        _this.state = {
            isOn: false
        };
        return _this;
    }
    OverlayContainer.prototype.getPosition = function (e) {
        var scaledPosition = this.scalePosition(e);
        this.renderLine(scaledPosition[0]);
        this.renderCircle(this.refC1.current, scaledPosition[0], scaledPosition[1]);
        this.renderContent(scaledPosition[2]);
    };
    OverlayContainer.prototype.scalePosition = function (e) {
        var positionX = this.props.location.state.scaleX.invert(d3.pointer(e)[0]);
        var bisect = d3.bisector(function (d) { return d.x; }).left;
        var i = bisect(this.props.location.state.data, positionX);
        var x = this.props.location.state.scaleX(this.props.location.state.data[i].x);
        var y = this.props.location.state.scaleY(this.props.location.state.data[i].y);
        return [x, y, this.props.location.state.data[i]];
    };
    OverlayContainer.prototype.renderLine = function (x) {
        d3.select(this.ref.current)
            .select(".tooltip-line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", this.props.location.state.height)
            .style("stroke", "black");
    };
    OverlayContainer.prototype.renderCircle = function (ref, x, y) {
        d3.select(ref)
            .attr("cx", x)
            .attr("cy", y);
    };
    OverlayContainer.prototype.renderContent = function (data) {
        d3.select(this.ref.current)
            .select(".content-title")
            .text(data.x);
    };
    OverlayContainer.prototype.render = function () {
        var _this = this;
        return (React.createElement("g", { transform: "translate(".concat(this.props.location.state.translateX, ", ").concat(this.props.location.state.translateY, ")") },
            React.createElement("g", { ref: this.ref, opacity: this.state.isOn ? 1 : 0 },
                React.createElement("line", { className: "tooltip-line" }),
                React.createElement("g", { className: "tooltip-content" },
                    React.createElement("rect", { className: "content-background" }),
                    React.createElement("text", { className: "content-title" }),
                    React.createElement("g", { className: "content" })),
                React.createElement("circle", { ref: this.refC1, r: 5 })),
            React.createElement("rect", { onMouseMove: function (e) { return _this.getPosition(e); }, onMouseEnter: function () { return _this.setState({ isOn: true }); }, onMouseLeave: function () { return _this.setState({ isOn: false }); }, width: this.props.location.state.width, height: this.props.location.state.height, opacity: 0 })));
    };
    return OverlayContainer;
}(React.PureComponent));
exports.default = OverlayContainer;
//# sourceMappingURL=OverlayContainer.js.map
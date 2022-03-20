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
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        return _this;
    }
    Circle.prototype.componentDidMount = function () {
        this.renderCircle();
    };
    Circle.prototype.renderCircle = function () {
        d3.select(this.ref.current)
            .classed("circle", true)
            .transition()
            .duration(750)
            .attr("cx", this.props.location.state.scaleX(this.props.location.state.dataX))
            .attr("cy", this.props.location.state.scaleY(this.props.location.state.dataY));
    };
    Circle.prototype.render = function () {
        return (React.createElement("circle", { ref: this.ref, cx: 0, cy: 0, r: this.props.location.state.r, fill: this.props.location.state.color, stroke: this.props.location.state.color, style: { "fillOpacity": 0.5 } }));
    };
    return Circle;
}(React.PureComponent));
exports.default = Circle;
//# sourceMappingURL=Circle.js.map
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
var Axis = /** @class */ (function (_super) {
    __extends(Axis, _super);
    function Axis() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.state = {
            axis: _this.props.location.state.type == "left" ?
                d3.axisLeft(_this.props.location.state.scale).ticks(_this.props.location.state.ticks) :
                d3.axisBottom(_this.props.location.state.scale)
        };
        return _this;
    }
    Axis.prototype.componentDidMount = function () {
        this.renderAxis();
    };
    Axis.prototype.componentDidUpdate = function () {
        this.renderAxis();
    };
    Axis.prototype.renderAxis = function () {
        d3.select(this.ref.current)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .call(this.state.axis);
    };
    Axis.prototype.render = function () {
        return (React.createElement("g", { ref: this.ref, transform: "translate(".concat(this.props.location.state.translateX, ", ").concat(this.props.location.state.translateY, ")") }));
    };
    return Axis;
}(React.PureComponent));
exports.default = Axis;
//# sourceMappingURL=Axis.js.map
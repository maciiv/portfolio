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
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.state = {
            d: d3.line()
                .x(function (d) { return _this.props.location.state.scaleX(d.x); })
                .y(function (d) { return _this.props.location.state.scaleY(d.y); })(_this.props.location.state.data)
        };
        return _this;
    }
    Line.prototype.componentDidMount = function () {
        this.renderLine();
    };
    Line.prototype.componentDidUpdate = function () {
        this.pathGenerator();
        this.renderLine();
    };
    Line.prototype.pathGenerator = function () {
        var _this = this;
        this.setState({
            d: d3.line()
                .x(function (d) { return _this.props.location.state.scaleX(d.x); })
                .y(function (d) { return _this.props.location.state.scaleY(d.y); })(this.props.location.state.data)
        });
    };
    Line.prototype.renderLine = function () {
        var totalLenght = this.ref.current.getTotalLength();
        d3.select(this.ref.current)
            .classed("line", true)
            .attr("stroke-dasharray", "".concat(totalLenght, ", ").concat(totalLenght))
            .attr("stroke-dashoffset", totalLenght)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    };
    Line.prototype.render = function () {
        return (React.createElement("path", { ref: this.ref, d: this.state.d, fill: "none", stroke: this.props.location.state.color }));
    };
    return Line;
}(React.PureComponent));
exports.default = Line;
//# sourceMappingURL=Line.js.map
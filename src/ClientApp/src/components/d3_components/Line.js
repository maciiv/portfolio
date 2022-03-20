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
        return _this;
    }
    Line.prototype.componentDidMount = function () {
        this.renderLine();
    };
    Line.prototype.renderLine = function () {
        var _this = this;
        var d = d3.line()
            .x(function (d) { return _this.props.location.state.scaleX(new Date(d.date)); })
            .y(function (d) { return _this.props.location.state.scaleY(d.cases); })(d3.sort(this.props.location.state.data, function (d) { return new Date(d.date); }));
        d3.select(this.ref.current)
            .classed("line", true)
            .transition()
            .duration(750)
            .attr("d", d);
    };
    Line.prototype.render = function () {
        return (React.createElement("path", { ref: this.ref, d: "", fill: "none", stroke: this.props.location.state.color }));
    };
    return Line;
}(React.PureComponent));
exports.default = Line;
//# sourceMappingURL=Line.js.map
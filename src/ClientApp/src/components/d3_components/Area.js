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
var Area = /** @class */ (function (_super) {
    __extends(Area, _super);
    function Area() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.state = {
            area: d3.area()
                .x(function (d) { return _this.props.location.state.scaleX(d.x); })
                .y1(function (d) { return _this.props.location.state.scaleY(d.y); })
                .y0(function (d) { return _this.props.location.state.scaleY(0); })(_this.props.location.state.data)
        };
        return _this;
    }
    Area.prototype.componentDidMount = function () {
        this.renderArea();
    };
    Area.prototype.componentDidUpdate = function () {
        this.areaGenerator();
        this.renderArea();
    };
    Area.prototype.renderArea = function () {
        d3.select(this.ref.current)
            .classed("area", true)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr("opacity", 0.25);
    };
    Area.prototype.areaGenerator = function () {
        var _this = this;
        this.setState({
            area: d3.area()
                .x(function (d) { return _this.props.location.state.scaleX(d.x); })
                .y1(function (d) { return _this.props.location.state.scaleY(d.y); })
                .y0(function (d) { return _this.props.location.state.scaleY(0); })(this.props.location.state.data)
        });
    };
    Area.prototype.render = function () {
        return (React.createElement("path", { ref: this.ref, d: this.state.area, fill: this.props.location.state.color, opacity: 0 }));
    };
    return Area;
}(React.PureComponent));
exports.default = Area;
//# sourceMappingURL=Area.js.map
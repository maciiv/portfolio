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
var GeoPath = /** @class */ (function (_super) {
    __extends(GeoPath, _super);
    function GeoPath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.state = {
            projection: d3.geoMercator()
                .scale(135)
                .center([0, 45])
                .translate([_this.props.location.state.width / 2, _this.props.location.state.height / 2])
        };
        return _this;
    }
    GeoPath.prototype.componentDidMount = function () {
        this.renderMap();
    };
    GeoPath.prototype.componentDidUpdate = function () {
        this.renderMap();
    };
    GeoPath.prototype.renderMap = function () {
        d3.select(this.ref.current)
            .classed("geo-path", true)
            .datum(this.props.location.state.data)
            .attr("id", function (d) { return d.properties["name"]; })
            .transition()
            .duration(750)
            .attr("d", d3.geoPath().projection(this.state.projection))
            .ease(d3.easeLinear);
    };
    GeoPath.prototype.render = function () {
        return (React.createElement("path", { ref: this.ref, clipPath: "url(#clip)", fill: this.props.location.state.color, stroke: "black" }));
    };
    return GeoPath;
}(React.PureComponent));
exports.default = GeoPath;
//# sourceMappingURL=GeoPath.js.map
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
var CustomMethods_1 = require("../../assets/js/CustomMethods");
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refTooltip = React.createRef();
        _this.state = {
            position: new CustomMethods_1.PositionTooltip()
        };
        return _this;
    }
    Tooltip.prototype.render = function () {
        return (React.createElement("g", { ref: this.refTooltip, className: "tooltip-content", opacity: this.props.location.state.title === undefined ? 0 : 1, transform: "translate(".concat(this.state.position.translateX(this.props.location.state.x, this.props.location.state.width, this.refTooltip) + 10, ", ").concat(this.state.position.translateY(this.props.location.state.y, this.props.location.state.height, this.refTooltip), ")") },
            React.createElement("rect", { className: "content-background", y: -20, x: -5, width: 200, height: 90 }),
            React.createElement("text", { className: "content-title" }, this.props.location.state.title),
            React.createElement("g", { className: "content" }, this.props.location.state.tooltipValues !== undefined ? this.props.location.state.tooltipValues.map(function (v, i) {
                return React.createElement("g", { transform: "translate(0, ".concat((i + 1) * 15, ")") },
                    React.createElement("text", { className: "item-name", x: 15 }, v.name),
                    React.createElement("text", { className: "item-value", x: 65 }, v.value));
            }) : null)));
    };
    return Tooltip;
}(React.PureComponent));
exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map
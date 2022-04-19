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
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.prototype.render = function () {
        return (React.createElement("g", { className: "tooltip-content", opacity: this.props.location.state.title === undefined ? 0 : 1, transform: "translate(".concat(this.props.location.state.translateX, ", ").concat(this.props.location.state.translateY, ")") },
            React.createElement("rect", { className: "content-background", y: -20, x: -5, width: 200, height: 90 }),
            React.createElement("text", { className: "content-title" }, this.props.location.state.title),
            React.createElement("g", { className: "content" }, this.props.location.state.values.map(function (v) {
                return React.createElement("g", null,
                    React.createElement("text", { className: "item-name", x: 15 }, v.name),
                    React.createElement("text", { className: "item-value", x: 65 }, v.value));
            }))));
    };
    return Tooltip;
}(React.PureComponent));
exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map
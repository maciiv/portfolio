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
var ContentContainer = /** @class */ (function (_super) {
    __extends(ContentContainer, _super);
    function ContentContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        return _this;
    }
    ContentContainer.prototype.render = function () {
        return (React.createElement("g", { transform: "translate(".concat(this.props.location.state.translateX, ", ").concat(this.props.location.state.translateY, ")"), clipPath: "url(#clip)" },
            React.createElement("rect", { className: "zoom", width: this.props.location.state.width, height: this.props.location.state.height }),
            React.createElement("clipPath", { id: "clip", ref: this.ref },
                React.createElement("rect", { x: "1", width: this.props.location.state.width, height: this.props.location.state.height })),
            this.props.children));
    };
    return ContentContainer;
}(React.PureComponent));
exports.default = ContentContainer;
//# sourceMappingURL=ContentContainer.js.map
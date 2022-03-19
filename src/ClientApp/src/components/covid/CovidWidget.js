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
var reactstrap_1 = require("reactstrap");
var CovidWidget = /** @class */ (function (_super) {
    __extends(CovidWidget, _super);
    function CovidWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CovidWidget.prototype.render = function () {
        return (React.createElement(reactstrap_1.Card, null,
            React.createElement(reactstrap_1.CardBody, null,
                React.createElement(reactstrap_1.CardTitle, { className: "d-flex" },
                    React.createElement("span", { className: "mx-auto" }, this.props.location.state.number)),
                React.createElement(reactstrap_1.CardSubtitle, { className: "mb-2 text-muted d-flex" },
                    React.createElement("span", { className: "mx-auto" }, this.props.location.state.name)))));
    };
    return CovidWidget;
}(React.PureComponent));
exports.default = CovidWidget;
//# sourceMappingURL=CovidWidget.js.map
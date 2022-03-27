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
var CovidCountries = /** @class */ (function (_super) {
    __extends(CovidCountries, _super);
    function CovidCountries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.state = {
            width: 0,
            height: 0,
            margin: { top: 10, right: 30, bottom: 30, left: 80 },
            data: _this.props.location.state.data,
            isLoading: true
        };
        return _this;
    }
    CovidCountries.prototype.componentDidMount = function () {
        this.renderTreeMap();
    };
    CovidCountries.prototype.renderTreeMap = function () {
        if (this.ref.current === null)
            return;
        var width = this.ref.current.getBoundingClientRect().width - this.state.margin.left - this.state.margin.right;
        var height = this.ref.current.getBoundingClientRect().height - this.state.margin.top - this.state.margin.bottom;
    };
    CovidCountries.prototype.render = function () {
        return (React.createElement(React.Fragment, null, this.state.isLoading ? React.createElement(reactstrap_1.Spinner, null) :
            React.createElement(reactstrap_1.Row, { className: "m-4" },
                React.createElement(reactstrap_1.Col, { md: "12", className: "mt-3" }, this.state.isLoading ? React.createElement(reactstrap_1.Spinner, null) :
                    React.createElement("svg", { preserveAspectRatio: "xMinYMin meet", viewBox: "0 0 ".concat(this.state.width + this.state.margin.left + this.state.margin.right, " ").concat(this.state.height + this.state.margin.top + this.state.margin.bottom) })))));
    };
    return CovidCountries;
}(React.PureComponent));
exports.default = CovidCountries;
//# sourceMappingURL=CovidCountries.js.map
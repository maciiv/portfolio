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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var reactstrap_1 = require("reactstrap");
var CovidCountriesMap_1 = require("./CovidCountriesMap");
var CovidCountries = /** @class */ (function (_super) {
    __extends(CovidCountries, _super);
    function CovidCountries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isLoading: true
        };
        return _this;
    }
    CovidCountries.prototype.componentDidMount = function () {
        this.loaded();
    };
    CovidCountries.prototype.loaded = function () {
        this.setState({
            isLoading: false
        });
    };
    CovidCountries.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Row, { className: "m-4" },
                React.createElement(reactstrap_1.Col, { md: "9", className: "mt-3" },
                    React.createElement(CovidCountriesMap_1.default, __assign({}, {
                        location: {
                            state: {
                                data: this.props.location.state.data
                            }
                        }
                    }))))));
    };
    return CovidCountries;
}(React.PureComponent));
exports.default = CovidCountries;
//# sourceMappingURL=CovidCountries.js.map
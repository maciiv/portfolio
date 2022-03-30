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
var d3 = require("d3");
var CovidCountriesMap_1 = require("./CovidCountriesMap");
var CovidCountries = /** @class */ (function (_super) {
    __extends(CovidCountries, _super);
    function CovidCountries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.state = {
            width: 0,
            height: 0,
            margin: { top: 10, right: 30, bottom: 30, left: 80 },
            data: {},
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
        console.log(this.props.location.state.data);
        var test = d3.stratify()
            .id(function (d) { return d.country; })
            .parentId(function (d) { return d.continent; })(this.props.location.state.data);
        console.log(test);
        this.setState({
            width: width,
            height: height,
            data: test,
            isLoading: false
        });
    };
    CovidCountries.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Row, { className: "m-4" },
                React.createElement(reactstrap_1.Col, { md: "12", className: "mt-3" },
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
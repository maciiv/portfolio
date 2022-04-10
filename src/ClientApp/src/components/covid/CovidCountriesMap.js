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
var ContentContainer_1 = require("../d3_components/ContentContainer");
var GeoPath_1 = require("../d3_components/GeoPath");
var CovidCountriesMapLegend_1 = require("./CovidCountriesMapLegend");
var CovidCountriesMap = /** @class */ (function (_super) {
    __extends(CovidCountriesMap, _super);
    function CovidCountriesMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.state = {
            width: 0,
            height: 0,
            margin: { top: 10, right: 150, bottom: 30, left: 30 },
            data: _this.props.location.state.data,
            geoData: {},
            filterData: [],
            colorScale: {},
            color: d3.interpolateBlues,
            isLoading: true
        };
        return _this;
    }
    CovidCountriesMap.prototype.componentDidMount = function () {
        this.renderMap();
    };
    CovidCountriesMap.prototype.renderMap = function () {
        var _this = this;
        if (this.ref.current === null)
            return;
        var width = this.ref.current.getBoundingClientRect().width - this.state.margin.left - this.state.margin.right;
        var height = this.ref.current.getBoundingClientRect().height - this.state.margin.top - this.state.margin.bottom;
        fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
            .then(function (response) { return response.json(); })
            .then(function (geoData) {
            var countriesData = d3.rollup(_this.props.location.state.data, function (d) {
                return {
                    cases: d3.sum(d.map(function (c) { return c.cases; })),
                    hosp: d3.sum(d.map(function (c) { return c.hosp; })),
                    deaths: d3.sum(d.map(function (c) { return c.deaths; })),
                    vax: d3.sum(d.map(function (c) { return c.vax; }))
                };
            }, function (d) { return d.country; });
            var data = Array.from(countriesData, function (_a) {
                var country = _a[0], sum = _a[1];
                return ({ country: country, cases: sum.cases, hosp: sum.hosp, deaths: sum.deaths, vax: sum.vax });
            });
            console.log(data);
            _this.setState({
                width: width,
                height: height,
                geoData: geoData,
                data: data,
                filterData: data.map(function (d) { return { country: d.country, data: d.cases }; }),
                colorScale: d3.scaleLinear()
                    .domain([0, d3.max(data.map(function (d) { return d.cases; }))])
                    .range([0, 1]),
                isLoading: false
            });
        });
    };
    CovidCountriesMap.prototype.filterBy = function (country) {
        var fd = this.state.filterData.find(function (d) { return d.country == country; });
        if (fd !== undefined) {
            return fd.data;
        }
        else {
            return 0;
        }
    };
    CovidCountriesMap.prototype.dataByCases = function () {
        this.setState({
            filterData: this.state.data.map(function (d) { return { country: d.country, data: d.cases }; }),
            colorScale: this.state.colorScale.domain([0, d3.max(this.state.data.map(function (d) { return d.cases; }))]),
            color: d3.interpolateBlues
        });
    };
    CovidCountriesMap.prototype.dataByHosp = function () {
        this.setState({
            filterData: this.state.data.map(function (d) { return { country: d.country, data: d.hosp }; }),
            colorScale: this.state.colorScale.domain([0, d3.max(this.state.data.map(function (d) { return d.hosp; }))]),
            color: d3.interpolatePurples
        });
    };
    CovidCountriesMap.prototype.dataByDeaths = function () {
        this.setState({
            filterData: this.state.data.map(function (d) { return { country: d.country, data: d.deaths }; }),
            colorScale: this.state.colorScale.domain([0, d3.max(this.state.data.map(function (d) { return d.deaths; }))]),
            color: d3.interpolateReds
        });
    };
    CovidCountriesMap.prototype.dataByVax = function () {
        this.setState({
            filterData: this.state.data.map(function (d) { return { country: d.country, data: d.vax }; }),
            colorScale: this.state.colorScale.domain([0, d3.max(this.state.data.map(function (d) { return d.vax; }))]),
            color: d3.interpolateGreens
        });
    };
    CovidCountriesMap.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Card, null,
                React.createElement(reactstrap_1.CardBody, null,
                    React.createElement(reactstrap_1.CardTitle, null,
                        React.createElement("h5", null, "COVID-19 World Map")),
                    React.createElement(reactstrap_1.CardSubtitle, null,
                        React.createElement(reactstrap_1.ButtonGroup, null,
                            React.createElement(reactstrap_1.Button, { onClick: function () { return _this.dataByCases(); } }, "Cases"),
                            React.createElement(reactstrap_1.Button, { onClick: function () { return _this.dataByHosp(); } }, "Hospitalisations"),
                            React.createElement(reactstrap_1.Button, { onClick: function () { return _this.dataByDeaths(); } }, "Deaths"),
                            React.createElement(reactstrap_1.Button, { onClick: function () { return _this.dataByVax(); } }, "Vaccinations"))),
                    React.createElement("div", { ref: this.ref, style: { width: "100%", height: "80vh" } }, this.state.isLoading ? React.createElement(reactstrap_1.Spinner, null) :
                        React.createElement("svg", { preserveAspectRatio: "xMinYMin meet", viewBox: "0 0 ".concat(this.state.width + this.state.margin.left + this.state.margin.right, " ").concat(this.state.height + this.state.margin.top + this.state.margin.bottom) },
                            React.createElement(ContentContainer_1.default, __assign({}, {
                                location: {
                                    state: {
                                        width: this.state.width,
                                        height: this.state.height,
                                        translateX: this.state.margin.left,
                                        translateY: this.state.margin.top
                                    }
                                }
                            }), this.state.geoData.features.map(function (d) {
                                return React.createElement(GeoPath_1.default, __assign({}, {
                                    location: {
                                        state: {
                                            width: _this.state.width,
                                            height: _this.state.height,
                                            data: d,
                                            color: _this.state.color(_this.state.colorScale(_this.filterBy(d.properties["name"])))
                                        }
                                    }
                                }));
                            })),
                            React.createElement(CovidCountriesMapLegend_1.default, __assign({}, {
                                location: {
                                    state: {
                                        height: this.state.height,
                                        translateX: this.state.width + this.state.margin.right,
                                        color: this.state.color,
                                        max: d3.max(this.state.filterData.map(function (d) { return d.data; }))
                                    }
                                }
                            }))))))));
    };
    return CovidCountriesMap;
}(React.PureComponent));
exports.default = CovidCountriesMap;
//# sourceMappingURL=CovidCountriesMap.js.map
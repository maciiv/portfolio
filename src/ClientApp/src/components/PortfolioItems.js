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
var react_redux_1 = require("react-redux");
var reactstrap_1 = require("reactstrap");
var PortfolioItemsStore = require("../store/PortfolioItems");
var PortfolioItems = /** @class */ (function (_super) {
    __extends(PortfolioItems, _super);
    function PortfolioItems() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PortfolioItems.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    PortfolioItems.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { id: "portfolio", className: "paddsection" },
                React.createElement(reactstrap_1.Container, null,
                    React.createElement("div", { className: "section-title text-center" },
                        React.createElement("h2", null, "My Portfolio"))),
                React.createElement(reactstrap_1.Container, null,
                    this.renderFilters(),
                    this.renderPortfolioItems()))));
    };
    PortfolioItems.prototype.ensureDataFetched = function () {
        this.props.requestPortfolioItems();
    };
    PortfolioItems.prototype.filter = function (filter) {
        this.props.filterPortfolioItems(filter);
    };
    PortfolioItems.prototype.renderFilters = function () {
        var _this = this;
        return (React.createElement(reactstrap_1.Row, null,
            React.createElement(reactstrap_1.Col, { lg: "12", className: "d-flex justify-content-center" },
                React.createElement("ul", { id: "portfolio-flters" },
                    React.createElement("li", { onClick: function () { return _this.filter(); }, className: this.props.filter === undefined ? "filter-active" : "" }, "All"),
                    React.createElement("li", { onClick: function () { return _this.filter("visualisation"); }, className: this.props.filter === "visualisation" ? "filter-active" : "" }, "Visualisations"),
                    React.createElement("li", { onClick: function () { return _this.filter("web"); }, className: this.props.filter === "web" ? "filter-active" : "" }, "WebApps")))));
    };
    PortfolioItems.prototype.renderPortfolioItems = function () {
        return (React.createElement(reactstrap_1.Row, null, this.props.filteredItems.map(function (item) {
            return React.createElement(reactstrap_1.Col, { lg: "4", md: "6", className: "portfolio-item" },
                React.createElement("img", { src: item.imageUrl, className: "img-fluid", alt: "" }),
                React.createElement("div", { className: "portfolio-info" },
                    React.createElement(reactstrap_1.Row, null,
                        React.createElement(reactstrap_1.Col, { lg: "9", md: "8" },
                            React.createElement("h4", null, item.name)),
                        React.createElement(reactstrap_1.Col, { lg: "3", md: "4" },
                            React.createElement("a", { href: item.gitHubUrl, className: "preview-link", title: "GitHub page" },
                                React.createElement("i", { className: "bx bxl-github" })),
                            React.createElement("a", { href: item.itemUrl, className: "details-link", title: "More details" },
                                React.createElement("i", { className: "bx bx-link" })))),
                    React.createElement("p", null, item.description)));
        })));
    };
    return PortfolioItems;
}(React.PureComponent));
;
exports.default = (0, react_redux_1.connect)(function (state) { return state.portfolioItems; }, PortfolioItemsStore.actionCreators)(PortfolioItems);
//# sourceMappingURL=PortfolioItems.js.map
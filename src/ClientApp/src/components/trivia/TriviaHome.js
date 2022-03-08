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
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var TriviaHomeStore = require("../../store/TriviaHome");
var TriviaHome = /** @class */ (function (_super) {
    __extends(TriviaHome, _super);
    function TriviaHome() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TriviaHome.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    TriviaHome.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Container, null,
                React.createElement(reactstrap_1.Row, { className: "my-3" },
                    React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex" },
                        React.createElement("h3", { className: "mx-auto" }, "Insert your name below")),
                    React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex" },
                        React.createElement(reactstrap_1.Input, { type: "text", className: "mx-auto w-25" })),
                    React.createElement(reactstrap_1.Col, { md: "12" },
                        React.createElement("h3", { className: "my-3 mx-auto" }, "Select the category you want to play!")),
                    this.props.trivia.map(function (trivia) {
                        return React.createElement(reactstrap_1.Col, null, _this.renderCard(trivia));
                    })))));
    };
    TriviaHome.prototype.ensureDataFetched = function () {
        this.props.requestTrivia();
    };
    TriviaHome.prototype.renderCard = function (trivia) {
        return (React.createElement(reactstrap_1.Card, null,
            React.createElement(reactstrap_1.CardBody, null,
                React.createElement(reactstrap_1.CardTitle, { tag: "h5" }, trivia.category),
                React.createElement(reactstrap_1.CardText, null,
                    "How much do you know about ",
                    trivia.category.toLowerCase(),
                    "? If you think you are a specialist in this category, try answering ",
                    trivia.questions.length,
                    " questions and test yourself"),
                React.createElement(react_router_dom_1.Link, { to: "/webapps/trivia-questions/".concat(trivia.category), className: "btn btn-primary" }, "Select"))));
    };
    return TriviaHome;
}(React.PureComponent));
;
exports.default = (0, react_redux_1.connect)(function (state) { return state.triviaHome; }, TriviaHomeStore.actionCreators)(TriviaHome);
//# sourceMappingURL=TriviaHome.js.map
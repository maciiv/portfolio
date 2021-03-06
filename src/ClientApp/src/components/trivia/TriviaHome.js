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
var TriviaStore = require("../../store/Trivia");
var TriviaHome = /** @class */ (function (_super) {
    __extends(TriviaHome, _super);
    function TriviaHome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            userName: ""
        };
        return _this;
    }
    TriviaHome.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    TriviaHome.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Container, null,
                React.createElement(reactstrap_1.Row, { className: "my-3" },
                    React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex mt-5" },
                        React.createElement(reactstrap_1.Input, { type: "text", className: "mx-auto w-50", placeholder: "Insert your name to be able to select a category", onChange: function (e) { return _this.setUserName(e); } })),
                    React.createElement(reactstrap_1.Col, { md: "12" },
                        React.createElement("h3", { className: "my-5 mx-auto" }, "Select the category you want to play!")),
                    this.props.trivia.map(function (trivia) {
                        return React.createElement(reactstrap_1.Col, null, _this.renderCard(trivia));
                    })))));
    };
    TriviaHome.prototype.ensureDataFetched = function () {
        this.props.requestTrivia();
    };
    TriviaHome.prototype.setUserName = function (e) {
        this.setState({
            userName: e.target.value
        });
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
                React.createElement(react_router_dom_1.Link, { to: { pathname: "/webapps/trivia/questions", state: { questions: trivia.questions, userName: this.state.userName } }, className: this.state.userName !== undefined && this.state.userName !== "" ? "btn btn-primary" : "btn btn-primary disabled" }, "Select"))));
    };
    return TriviaHome;
}(React.PureComponent));
;
exports.default = (0, react_redux_1.connect)(function (state) { return state.trivia; }, TriviaStore.actionCreators)(TriviaHome);
//# sourceMappingURL=TriviaHome.js.map
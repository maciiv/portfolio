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
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var Timer_1 = require("../Timer");
var TriviaQuestions = /** @class */ (function (_super) {
    __extends(TriviaQuestions, _super);
    function TriviaQuestions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            index: 0,
            score: 0,
            time: {}
        };
        return _this;
    }
    TriviaQuestions.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Container, null, this.state.index < this.props.location.state.questions.length ?
                React.createElement(reactstrap_1.Row, { className: "my-5" },
                    React.createElement(reactstrap_1.Col, { md: "6", className: "d-flex md-5" },
                        React.createElement("h5", { className: "mr-auto" },
                            "Question ",
                            this.state.index + 1,
                            " of ",
                            this.props.location.state.questions.length)),
                    React.createElement(reactstrap_1.Col, { md: "6", className: "d-flex mb-5" },
                        React.createElement("h5", { className: "ml-auto" },
                            "Your time ",
                            React.createElement(Timer_1.default, __assign({}, { location: { state: { time: this.getTime.bind(this) } } })))),
                    React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex mb-5" },
                        React.createElement("h3", { className: "mx-auto" }, this.props.location.state.questions[this.state.index].question)),
                    this.props.location.state.questions[this.state.index].options.map(function (option) { return _this.renderOptions(option); })) :
                React.createElement(reactstrap_1.Row, { className: "my-5" },
                    React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex" },
                        React.createElement(react_router_dom_1.Link, { to: { pathname: "/webapps/trivia/finish", state: { userName: this.props.location.state.userName, score: this.state.score, minutes: this.state.time.minutes, seconds: this.state.time.seconds } }, className: "btn btn-primary w-25 mx-auto" }, "View your score!"))))));
    };
    TriviaQuestions.prototype.nextQuestion = function (isCorrect) {
        this.setState({
            index: this.state.index + 1,
            score: isCorrect ? this.state.score + 1 : this.state.score
        });
    };
    TriviaQuestions.prototype.getTime = function (timerTime) {
        this.setState({
            time: timerTime
        });
    };
    TriviaQuestions.prototype.renderOptions = function (option) {
        var _this = this;
        return (React.createElement(reactstrap_1.Col, { md: "6", className: "d-flex my-3" },
            React.createElement(reactstrap_1.Button, { className: "mx-auto w-50", onClick: function () { return _this.nextQuestion(option.isCorrect); } }, option.option)));
    };
    return TriviaQuestions;
}(React.PureComponent));
exports.default = TriviaQuestions;
;
//# sourceMappingURL=TriviaQuestions.js.map
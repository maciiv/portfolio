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
var TriviaQuestionsStore = require("../../store/TriviaQuestions");
var Timer_1 = require("../Timer");
var TriviaQuestions = /** @class */ (function (_super) {
    __extends(TriviaQuestions, _super);
    function TriviaQuestions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TriviaQuestions.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    TriviaQuestions.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Container, null, this.props.currentQuestionIndex < this.props.questions.length ?
                React.createElement(reactstrap_1.Row, { className: "my-5" },
                    React.createElement(reactstrap_1.Col, { md: "6", className: "d-flex mr-auto" },
                        React.createElement("h5", { className: "mr-auto" },
                            "Question ",
                            this.props.currentQuestionIndex + 1,
                            " of ",
                            this.props.questions.length)),
                    React.createElement(reactstrap_1.Col, { md: "6", className: "d-flex mb-5" },
                        React.createElement("h5", { className: "ml-auto" },
                            "Your time ",
                            React.createElement(Timer_1.default, null))),
                    React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex mb-5" },
                        React.createElement("h3", { className: "mx-auto" }, this.props.questions[this.props.currentQuestionIndex].question)),
                    this.props.questions[this.props.currentQuestionIndex].options.map(function (option) { return _this.renderOptions(option); })) : "")));
    };
    TriviaQuestions.prototype.ensureDataFetched = function () {
        var category = this.props.match.params.category;
        this.props.requestTriviaQuestions(category);
    };
    TriviaQuestions.prototype.nextQuestion = function () {
        this.props.requestNextTriviaQuestion();
    };
    TriviaQuestions.prototype.renderOptions = function (option) {
        var _this = this;
        return (React.createElement(reactstrap_1.Col, { md: "6", className: "d-flex my-3" },
            React.createElement(reactstrap_1.Button, { className: "mx-auto w-50", onClick: function () { return _this.nextQuestion(); } }, option.option)));
    };
    return TriviaQuestions;
}(React.PureComponent));
;
exports.default = (0, react_redux_1.connect)(function (state) { return state.triviaQuestions; }, TriviaQuestionsStore.actionCreators)(TriviaQuestions);
//# sourceMappingURL=TriviaQuestions.js.map
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
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var TriviaWinners = /** @class */ (function (_super) {
    __extends(TriviaWinners, _super);
    function TriviaWinners() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            winners: []
        };
        return _this;
    }
    TriviaWinners.prototype.componentDidMount = function () {
        this.finishTrivia();
    };
    TriviaWinners.prototype.finishTrivia = function () {
        var _this = this;
        fetch("trivia/winners", {
            method: 'POST',
            body: JSON.stringify({ 'user': this.props.location.state.userName, 'score': this.props.location.state.score }),
            headers: { "Content-Type": "application/json" }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({
                winners: data
            });
        });
    };
    TriviaWinners.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Container, null,
                React.createElement(reactstrap_1.Row, { className: "my-3" },
                    React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex" },
                        React.createElement("h3", null,
                            "You completed the trivia in ",
                            this.props.location.state.minutes,
                            " minutes and ",
                            this.props.location.state.seconds,
                            " seconds")),
                    React.createElement(reactstrap_1.Col, { md: "12", className: "mt-5" },
                        React.createElement(reactstrap_1.Table, { hover: true },
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, "User name"),
                                    React.createElement("th", null, "Score"))),
                            React.createElement("tbody", null, this.state.winners.map(function (winners) {
                                return React.createElement("tr", null,
                                    React.createElement("td", null, winners.user),
                                    React.createElement("td", null, winners.score));
                            })))),
                    React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex mt-5" },
                        React.createElement(react_router_dom_1.Link, { to: "/webapps/trivia", className: "btn btn-primary btn-block w-25 mx-auto" }, "Go back to trivia home"))))));
    };
    return TriviaWinners;
}(React.PureComponent));
exports.default = TriviaWinners;
;
//# sourceMappingURL=TriviaWinners.js.map
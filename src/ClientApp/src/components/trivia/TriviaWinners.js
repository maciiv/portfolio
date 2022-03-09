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
var TriviaWinnersStore = require("../../store/TriviaWinners");
var TriviaWinners = /** @class */ (function (_super) {
    __extends(TriviaWinners, _super);
    function TriviaWinners() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TriviaWinners.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    TriviaWinners.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Container, null,
                React.createElement(reactstrap_1.Row, { className: "my-3" },
                    React.createElement(reactstrap_1.Col, { md: "12", className: "d-flex my-5" },
                        React.createElement("h4", null,
                            "You completed the trivia in ",
                            this.props.totalMinutes,
                            " minutes and ",
                            this.props.totalSeconds,
                            " seconds")),
                    React.createElement(reactstrap_1.Col, { md: "12", className: "mt-5" },
                        React.createElement(reactstrap_1.Table, { hover: true },
                            React.createElement("tbody", null, this.props.winners.map(function (winners) {
                                return React.createElement("tr", null,
                                    React.createElement("td", null, winners.user),
                                    React.createElement("td", null, winners.score));
                            }))))))));
    };
    TriviaWinners.prototype.ensureDataFetched = function () {
        this.props.finishTrivia();
        this.props.stopTimer();
    };
    return TriviaWinners;
}(React.PureComponent));
;
exports.default = (0, react_redux_1.connect)(function (state) { return state.triviaWinners; }, TriviaWinnersStore.actionCreators)(TriviaWinners);
//# sourceMappingURL=TriviaWinners.js.map
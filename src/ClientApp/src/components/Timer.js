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
var TimerStore = require("../store/Timer");
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Timer.prototype.componentDidMount = function () {
        this.props.startTimer();
    };
    Timer.prototype.componentWillUnmount = function () {
        this.props.stopTimer();
    };
    Timer.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            this.props.minutes < 10 ? "0" : "",
            this.props.minutes,
            ":",
            this.props.seconds < 10 ? "0" : "",
            this.props.seconds));
    };
    return Timer;
}(React.PureComponent));
;
exports.default = (0, react_redux_1.connect)(function (state) { return state.timer; }, TimerStore.actionCreators)(Timer);
//# sourceMappingURL=Timer.js.map
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
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isActive: false,
            time: { minutes: 0, seconds: 0 },
        };
        return _this;
    }
    Timer.prototype.componentDidMount = function () {
        this.startTimer();
    };
    Timer.prototype.componentWillUnmount = function () {
        if (this.props.location !== undefined) {
            this.props.location.state.time({ minutes: this.state.time.minutes, seconds: this.state.time.seconds });
        }
        this.stopTimer();
    };
    Timer.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            this.state.time.minutes < 10 ? "0" : "",
            this.state.time.minutes,
            ":",
            this.state.time.seconds < 10 ? "0" : "",
            this.state.time.seconds));
    };
    Timer.prototype.startTimer = function () {
        var _this = this;
        var seconds = this.state.time.seconds;
        var minutes = this.state.time.minutes;
        this.timerInterval = setInterval(function () {
            seconds += 1;
            if (seconds == 60) {
                minutes = +1;
                seconds = 0;
            }
            _this.setState({
                isActive: true,
                time: { minutes: minutes, seconds: seconds }
            });
        }, 1000);
    };
    Timer.prototype.stopTimer = function () {
        clearInterval(this.timerInterval);
        this.setState({
            isActive: false,
            time: { minutes: 0, seconds: 0 }
        });
    };
    return Timer;
}(React.PureComponent));
exports.default = Timer;
;
//# sourceMappingURL=Timer.js.map
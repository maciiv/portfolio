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
var SchedulerStore = require("../../store/Scheduler");
var Scheduler = /** @class */ (function (_super) {
    __extends(Scheduler, _super);
    function Scheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scheduler.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    Scheduler.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Container, null,
                React.createElement("h1", { className: "my-3" }, "Below is the scheduler for your motorcyclists"),
                React.createElement("h4", { className: "my-3" }, "Select the time block that suits you better. If you change your mind, just click again and the time block will be free"),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-12 text-center" },
                        React.createElement("h2", { className: "my-3" }, new Date().toDateString()),
                        React.createElement("h4", { className: "my-3" },
                            "Motorcyclists available ",
                            this.props.motorcyclists),
                        this.props.hasUpdate ? this.renderAlert() : "")),
                this.renderTable())));
    };
    Scheduler.prototype.ensureDataFetched = function () {
        this.props.requestScheduler();
    };
    Scheduler.prototype.updateSchedule = function (schedule) {
        if (this.props.motorcyclists == 0 && schedule.isAvailable) {
            return;
        }
        schedule.isAvailable = !schedule.isAvailable;
        this.props.updateScheduler(schedule);
    };
    Scheduler.prototype.renderTable = function () {
        var _this = this;
        return (React.createElement(reactstrap_1.Table, { hover: true },
            React.createElement("tbody", null, this.props.schedule.map(function (schedule) {
                return React.createElement("tr", { key: schedule.id, className: schedule.isAvailable ? "" : "table-danger", onClick: function () { return _this.updateSchedule(schedule); } },
                    React.createElement("td", null, schedule.time),
                    React.createElement("td", null, schedule.isAvailable ? "Is available" : "Is not available"));
            }))));
    };
    Scheduler.prototype.renderAlert = function () {
        return (React.createElement(reactstrap_1.UncontrolledAlert, { color: this.props.motorcyclists !== 0 ? "success" : "danger" }, this.props.motorcyclists !== 0 ? this.props.update < 0 ? "Motorcyclist assigned successfully" :
            this.props.update > 0 ? "Motorcyclists removed successfully" : "" :
            "Not available motorcyclists, please release one from the timetable and try again"));
    };
    return Scheduler;
}(React.PureComponent));
;
exports.default = (0, react_redux_1.connect)(function (state) { return state.scheduler; }, SchedulerStore.actionCreators)(Scheduler);
//# sourceMappingURL=Scheduler.js.map
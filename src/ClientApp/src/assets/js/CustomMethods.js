"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionTooltip = exports.CancelablePromise = void 0;
var CancelablePromise = /** @class */ (function () {
    function CancelablePromise(promise) {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            promise.then(function (val) { return (_this.canceled ? reject({ isCanceled: true }) : resolve(val)); }, function (error) { return (_this.canceled ? reject({ isCanceled: true }) : reject(error)); });
        });
        this.canceled = false;
    }
    CancelablePromise.prototype.cancel = function () {
        this.canceled = true;
    };
    return CancelablePromise;
}());
exports.CancelablePromise = CancelablePromise;
var PositionTooltip = /** @class */ (function () {
    function PositionTooltip() {
    }
    PositionTooltip.prototype.translateX = function (x, width, ref) {
        if (x === undefined) {
            return 0;
        }
        if (ref.current !== null) {
            var tooltipWidth = ref.current.getBoundingClientRect().width;
            if (x + tooltipWidth > width) {
                return x - tooltipWidth - 5;
            }
        }
        return x;
    };
    PositionTooltip.prototype.translateY = function (y, height, ref) {
        if (y === undefined) {
            return 0;
        }
        if (ref.current !== null) {
            var tooltipHeight = ref.current.getBoundingClientRect().height;
            if (y + tooltipHeight > height) {
                return y - tooltipHeight - 10;
            }
        }
        return y;
    };
    return PositionTooltip;
}());
exports.PositionTooltip = PositionTooltip;
//# sourceMappingURL=CustomMethods.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelablePromise = void 0;
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
//# sourceMappingURL=CustomMethods.js.map
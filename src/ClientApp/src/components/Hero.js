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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var reactstrap_1 = require("reactstrap");
var CustomMethods = require("../assets/js/CustomMethods");
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            text: "",
            isDone: false
        };
        return _this;
    }
    Hero.prototype.componentDidMount = function () {
        this.writeHero("Miguel Canizares");
    };
    Hero.prototype.componentWillUnmount = function () {
        this.letterPromise.cancel();
        clearTimeout(this.writeTimeout);
        clearTimeout(this.deleteTimeout);
    };
    Hero.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { id: "hero", className: "home" },
                React.createElement(reactstrap_1.Container, null,
                    React.createElement("div", { className: "hero-content" },
                        React.createElement("h1", null,
                            "I'm ",
                            React.createElement("span", { className: "typed" }, this.state.text),
                            !this.state.isDone ? React.createElement("span", { className: "typed-cursor" }) : ""),
                        React.createElement("p", null, "Researcher, Designer, Developer, Freelancer"),
                        React.createElement("ul", { className: "list-unstyled list-social" },
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://orcid.org/0000-0002-9747-4266" },
                                    React.createElement("img", { style: { width: 15.31, height: 21.6 }, src: "assets/img/orcid-logo-icon.svg", alt: "OrcID" }))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://au.linkedin.com/in/miguel-canizares" },
                                    React.createElement("i", { className: "bi bi-linkedin" }))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://twitter.com/mcanizaresmena" },
                                    React.createElement("i", { className: "bi bi-twitter" }))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://research.qut.edu.au/qutcds/staff/miguel-canizares/" },
                                    React.createElement("img", { style: { width: 45.31, height: 21.6 }, src: "assets/img/qut-logo.png", alt: "QUT" }))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://scholar.google.com.au/citations?user=5afmF3IAAAAJ&hl=en&oi=ao" }, "Google Scholar"))))))));
    };
    Hero.prototype.startHero = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.writeHero("Miguel Canizares")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.deleteHero()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.writeHero("A Researcher")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.deleteHero()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.writeHero("A Designer")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.deleteHero()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.writeHero("A Developer")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.deleteHero()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.writeHero("A Freelancer")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.deleteHero()];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.writeHero("Miguel Canizares", true)];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Hero.prototype.writeHero = function (text, isDone) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.writeTimeout = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var letters, _loop_1, this_1, i;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                letters = text.split('');
                                _loop_1 = function (i) {
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                this_1.letterPromise = new CustomMethods.CancelablePromise(new Promise(function (r) { return setTimeout(r, 100); }));
                                                return [4 /*yield*/, this_1.letterPromise
                                                        .promise
                                                        .then(function () {
                                                        var currentText = _this.state.text;
                                                        _this.setState({ text: currentText.concat(letters[i]) });
                                                    })
                                                        .catch(function (reason) { return console.log('isCancealed', reason.isCanceled); })];
                                            case 1:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                };
                                this_1 = this;
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < text.length)) return [3 /*break*/, 4];
                                return [5 /*yield**/, _loop_1(i)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4:
                                if (isDone) {
                                    this.setState({ isDone: true });
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, 500);
                return [2 /*return*/];
            });
        });
    };
    Hero.prototype.deleteHero = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.deleteTimeout = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var letters, _loop_2, this_2, i;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                letters = this.state.text;
                                _loop_2 = function (i) {
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                this_2.letterPromise = new CustomMethods.CancelablePromise(new Promise(function (r) { return setTimeout(r, 100); }));
                                                return [4 /*yield*/, this_2.letterPromise
                                                        .promise
                                                        .then(function () {
                                                        _this.setState({ text: letters.substr(0, i) });
                                                    })
                                                        .catch(function (reason) { return console.log('isCancealed', reason.isCanceled); })];
                                            case 1:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                };
                                this_2 = this;
                                i = letters.length;
                                _a.label = 1;
                            case 1:
                                if (!(i >= 0)) return [3 /*break*/, 4];
                                return [5 /*yield**/, _loop_2(i)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                i--;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, 3000);
                return [2 /*return*/];
            });
        });
    };
    return Hero;
}(React.PureComponent));
exports.default = Hero;
;
//# sourceMappingURL=Hero.js.map
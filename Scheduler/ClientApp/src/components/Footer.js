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
var reactstrap_1 = require("reactstrap");
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { id: "footer", className: "text-center" },
                React.createElement(reactstrap_1.Container, null,
                    React.createElement("div", { className: "socials-media text-center" },
                        React.createElement("ul", { className: "list-unstyled" },
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://orcid.org/0000-0002-9747-4266" },
                                    React.createElement("img", { style: { width: 26.4, height: 34.4 }, src: "assets/img/orcid-logo-icon.svg", alt: "OrcID" }))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://au.linkedin.com/in/miguel-canizares" },
                                    React.createElement("i", { className: "bi bi-linkedin" }))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://twitter.com/mcanizaresmena" },
                                    React.createElement("i", { className: "bi bi-twitter" }))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://research.qut.edu.au/qutcds/staff/miguel-canizares/" },
                                    React.createElement("img", { style: { width: 65.4, height: 34.4 }, src: "assets/img/qut-logo.png", alt: "QUT" }))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://scholar.google.com.au/citations?user=5afmF3IAAAAJ&hl=en&oi=ao" }, "Google Scholar")))),
                    React.createElement("p", null, "\u00A9 Copyrights Folio. All rights reserved."),
                    React.createElement("div", { className: "credits" },
                        "Designed by ",
                        React.createElement("a", { href: "https://bootstrapmade.com/" }, "BootstrapMade")))),
            React.createElement("a", { href: "#", className: "back-to-top d-flex align-items-center justify-content-center active" },
                React.createElement("i", { className: "bi bi-arrow-up-short" }))));
    };
    return Footer;
}(React.PureComponent));
exports.default = Footer;
//# sourceMappingURL=Footer.js.map
"use strict";
exports.__esModule = true;
var _ = require("lodash");
var service_1 = require("../User/service");
var Handlers_1 = require("../../api/responses/Handlers");
var TokenRoutes = /** @class */ (function () {
    function TokenRoutes() {
    }
    TokenRoutes.prototype.auth = function (req, res) {
        var credentials = {
            email: req.body.email,
            password: req.body.password
        };
        if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
            service_1["default"]
                .getByEmail(credentials.email)
                .then(_.partial(Handlers_1["default"].authSuccess, res, credentials))["catch"](_.partial(Handlers_1["default"].authFail, req, res));
        }
    };
    return TokenRoutes;
}());
exports["default"] = new TokenRoutes();

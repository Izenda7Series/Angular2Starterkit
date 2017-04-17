"use strict";
var Config = (function () {
    function Config() {
    }
    Config.getPath = function (value) {
        var apiEndPoint = "http://localhost:3358/";
        switch (value) {
            case "register":
                return apiEndPoint + "api/Account/Register";
            case "login":
                return apiEndPoint + "Token";
            case "logout":
                return apiEndPoint + "api/Account/Logout";
            case "getizendatoken":
                return apiEndPoint + "api/User/GenerateToken";
            default:
                return "";
        }
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map
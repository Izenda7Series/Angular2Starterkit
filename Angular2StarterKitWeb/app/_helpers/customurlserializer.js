"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Angular2 by default uses encodeURIComponent() to encode queryParams in URL, 
// Avoid it by writing custom URL serializer and override default functionality.
var router_1 = require("@angular/router");
var CustomUrlSerializer = (function () {
    function CustomUrlSerializer() {
    }
    CustomUrlSerializer.prototype.parse = function (url) {
        var dus = new router_1.DefaultUrlSerializer();
        return dus.parse(url);
    };
    CustomUrlSerializer.prototype.serialize = function (tree) {
        var dus = new router_1.DefaultUrlSerializer(), path = dus.serialize(tree);
        // use your regex to replace as per your requirement.
        return path.replace(/%2/g, ',');
    };
    return CustomUrlSerializer;
}());
exports.CustomUrlSerializer = CustomUrlSerializer;
//# sourceMappingURL=customurlserializer.js.map
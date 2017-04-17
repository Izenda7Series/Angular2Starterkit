"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var config_1 = require("../config");
var router_1 = require("@angular/router");
var AuthenticationService = (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
        // set token if saved in local storage
        var currentUser = localStorage.getItem('currentUser');
        this.token = localStorage.getItem('tokenKey');
    }
    AuthenticationService.prototype.login = function (tenantname, username, password) {
        var _this = this;
        var url = config_1.Config.getPath("login");
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('grant_type', 'password');
        urlSearchParams.append('tenant', tenantname);
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        var body = urlSearchParams.toString();
        var headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(function (response) {
            var token = response.json() && response.json().access_token;
            console.log(token);
            if (token) {
                _this.token = token;
                localStorage.setItem('currentUser', username);
                localStorage.setItem('tokenKey', token);
                _this.getIzendaToken(token);
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        var url = config_1.Config.getPath("logout");
        var token = localStorage.getItem("tokenKey");
        var headers;
        if (token) {
            headers = new http_1.Headers({ "Authorization": 'Bearer ' + token });
        }
        var body = {};
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .subscribe(function (response) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('tokenKey');
            localStorage.removeItem('izendatoken');
        }, function (err) {
            console.log(err);
        });
    };
    AuthenticationService.prototype.register = function (tenantname, username, password, confirmpassword) {
        var url = config_1.Config.getPath("register");
        var headers = new http_1.Headers({ "Content-Type": "application/json; charset=utf-8" });
        var body = JSON.stringify({ Tenant: tenantname, Email: username, Password: password, ConfirmPassword: confirmpassword });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.getIzendaToken = function (token) {
        var url = config_1.Config.getPath("getizendatoken");
        var headers = new http_1.Headers({ "Authorization": 'Bearer ' + token });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.get(url, options)
            .subscribe(function (data) {
            console.log(data.json());
            localStorage.setItem("izendatoken", data.json());
        }, function (error) {
            console.log("Cannot get Izenda Token");
            console.log(error);
        });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map
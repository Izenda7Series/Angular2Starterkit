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
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var RegisterComponent = (function () {
    function RegisterComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.loading = false;
        this.error = '';
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        console.log(this.model);
        this.authenticationService.register(this.model.tenantname, this.model.username, this.model.password, this.model.confirmpassword)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/login']);
            }
            else {
                _this.error = 'Register has failed, Try again';
                _this.loading = false;
            }
        }, function (error) {
            console.log(error);
            _this.loading = false;
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'register.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.AuthenticationService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map
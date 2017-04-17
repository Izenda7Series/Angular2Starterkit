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
var IzendaSynergy = require("../izenda/izenda_ui");
var ExportReportComponent = (function () {
    function ExportReportComponent(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.currentUserContext = {};
    }
    ExportReportComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log(this.activatedRoute);
        this.activatedRoute.params.subscribe(function (params) {
            _this.reportPartId = params['id'];
        });
        this.activatedRoute.queryParams.subscribe(function (params) {
            var token = params['token'];
            _this.currentUserContext = { token: token };
        });
        console.log(this.reportPartId);
        console.log(this.currentUserContext);
        IzendaSynergy.setCurrentUserContext(this.currentUserContext);
        IzendaSynergy.renderReportPart(document.getElementById('izenda-export-reportpart'), {
            "id": this.reportPartId,
            "useQueryParam": true,
        });
    };
    return ExportReportComponent;
}());
ExportReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'export.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
], ExportReportComponent);
exports.ExportReportComponent = ExportReportComponent;
//# sourceMappingURL=export.component.js.map
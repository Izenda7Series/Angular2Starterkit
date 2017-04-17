"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var index_1 = require("./_guards/index");
var index_2 = require("./_services/index");
var index_3 = require("./login/index");
var index_4 = require("./register/index");
var index_5 = require("./home/index");
var index_6 = require("./export/index");
var index_7 = require("./navbar/index");
var index_8 = require("./izendacomponents/index");
var izendaintegrate_1 = require("./_helpers/izendaintegrate");
//import './izenda/izenda-ui.css';
//let IzendaBI =  './izenda/izenda_ui';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            index_3.LoginComponent,
            index_5.HomeComponent,
            index_4.RegisterComponent,
            index_6.ExportReportComponent,
            index_8.Dashboard,
            index_8.DashboardDesigner,
            index_8.IzendaHome,
            index_8.IzendaSetting,
            index_8.ReportCustomFilter,
            index_8.ReportDesigner,
            index_8.ReportList,
            index_8.ReportPart,
            index_8.ReportViewer,
            index_7.Navbar
        ],
        providers: [
            index_1.AuthGuard,
            index_2.AuthenticationService,
            index_2.UserService,
            izendaintegrate_1.IzendaIntegrate
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
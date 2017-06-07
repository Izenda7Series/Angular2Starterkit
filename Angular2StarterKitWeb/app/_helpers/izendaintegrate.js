"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//declare var IzendaSynergy: any; //= require("./izenda/izenda_ui");
var IzendaSynergy = require("../izenda/izenda_ui");
var core_1 = require("@angular/core");
var IzendaIntegrate = (function () {
    function IzendaIntegrate() {
    }
    IzendaIntegrate.prototype.DoIzendaConfig = function () {
        IzendaSynergy.config({
            "WebApiUrl": "http://localhost:9999/api",
            //"WebApiUrl": "http://izenda-vm04.kms.com.vn:8200/api/",  
            "BaseUrl": "/",
            "RootPath": "/app/izenda",
            "CssFile": "izenda-ui.css",
            "Routes": {
                "Settings": "settings",
                "New": "new",
                "Dashboard": "dashboard",
                "Report": "report",
                "ReportViewer": "reportviewer",
                "ReportViewerPopup": "reportviewerpopup",
                "Viewer": "viewer"
            },
            "Timeout": 3600
        });
    };
    IzendaIntegrate.prototype.setContext = function () {
        var currentUserContext = {
            token: localStorage.getItem("izendatoken")
        };
        IzendaSynergy.setCurrentUserContext(currentUserContext);
    };
    /* Izenda Function */
    IzendaIntegrate.prototype.RenderIzenda = function () {
        this.setContext();
        IzendaSynergy.render(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.RenderIzendaSettings = function () {
        this.setContext();
        IzendaSynergy.renderSettingPage(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.RenderReportList = function () {
        this.setContext();
        IzendaSynergy.renderReportPage(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.RenderReportDesigner = function () {
        this.setContext();
        var dom = document.getElementById('izenda-root');
        IzendaSynergy.renderReportDesignerPage(dom);
        return dom;
    };
    IzendaIntegrate.prototype.RenderReportViewer = function () {
        this.setContext();
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), '75d975db-c19e-4b81-a5b2-8c63663856c9');
    };
    IzendaIntegrate.prototype.RenderReportCustomizedFilterViewer = function () {
        this.setContext();
        var filtersObj = {
            "filters": [],
            "overridingFilterValue": {
                p1value: 50,
                p2value: '30;#40' // override filter value at position 2 which is applying on current report, change beetween (20:50) to (30:40)
            }
        };
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), '75d975db-c19e-4b81-a5b2-8c63663856c9', filtersObj);
    };
    IzendaIntegrate.prototype.RenderReportParts = function () {
        //debugger;
        this.setContext();
        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part1'), {
            "id": "8F3B24F7-B55A-4095-81DE-68104175032A",
        });
        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part2'), {
            "id": "FFE428F2-1F4B-4BEB-9678-8FB7147A36FE",
        });
        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part3'), {
            "id": "C0D6695F-10F2-4CD3-851C-A47BAA2A2E4A",
        });
    };
    IzendaIntegrate.prototype.RenderDashboard = function () {
        this.setContext();
        IzendaSynergy.renderDashboardPage(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.RenderDashboardDesigner = function () {
        this.setContext();
        IzendaSynergy.renderNewDashboardPage(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.DestroyDom = function (dom) {
        this.setContext();
        IzendaSynergy.unmountComponent(dom);
    };
    return IzendaIntegrate;
}());
IzendaIntegrate = __decorate([
    core_1.Injectable()
], IzendaIntegrate);
exports.IzendaIntegrate = IzendaIntegrate;
//# sourceMappingURL=izendaintegrate.js.map
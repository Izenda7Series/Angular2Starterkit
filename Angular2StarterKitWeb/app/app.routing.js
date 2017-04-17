"use strict";
var router_1 = require("@angular/router");
var index_1 = require("./login/index");
var index_2 = require("./register/index");
var index_3 = require("./home/index");
var index_4 = require("./_guards/index");
var index_5 = require("./export/index");
var index_6 = require("./izendacomponents/index");
var appRoutes = [
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_2.RegisterComponent },
    { path: 'izenda', component: index_6.IzendaHome },
    { path: 'izenda/settings', component: index_6.IzendaSetting },
    { path: 'izenda/reportdesigner', component: index_6.ReportDesigner },
    { path: 'izenda/report', component: index_6.ReportList },
    { path: 'izenda/reportviewer', component: index_6.ReportViewer },
    { path: 'izenda/reportcustomfilter', component: index_6.ReportCustomFilter },
    { path: 'izenda/reportpart', component: index_6.ReportPart },
    { path: 'izenda/dashboarddesigner', component: index_6.DashboardDesigner },
    { path: 'izenda/dashboard', component: index_6.Dashboard },
    { path: '', component: index_3.HomeComponent, canActivate: [index_4.AuthGuard] },
    // export route
    { path: 'viewer/reportpart/:id', component: index_5.ExportReportComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
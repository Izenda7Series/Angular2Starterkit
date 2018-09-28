import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';

// used to create fake backend
import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions} from "@angular/http";

import {AppComponent} from "./container/app.component";
import {Routing} from "./app.routing";

import {AuthGuard} from "./_guards";
import {AuthenticationService, UserService} from "./_services";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {HomeComponent} from "./home/home.component";
import {NavbarComponent, FooterComponent} from "./components";
import {
    Dashboard,
    DashboardDesigner,
    IzendaHome,
    IzendaSetting,
    ReportCustomFilter,
    ReportDesigner,
    ReportList,
    ReportPart,
    AdvancedReportPart,
    ReportViewer,
    DashboardViewer,
    ExportReportComponent,
    ExportReportViewerComponent,
    ExportDashboardViewerComponent
} from "./libs";
import {IzendaIntegrate} from "./_helpers/izendaintegrate";

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpClientModule, Routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        ExportReportComponent,
        ExportReportViewerComponent,
        ExportDashboardViewerComponent,
        Dashboard,
        DashboardDesigner,
        IzendaHome,
        IzendaSetting,
        ReportCustomFilter,
        ReportDesigner,
        ReportList,
        ReportPart,
        AdvancedReportPart,
        ReportViewer,
        DashboardViewer,
        NavbarComponent,
        FooterComponent
    ],
    providers: [
        AuthGuard, AuthenticationService, UserService, IzendaIntegrate
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
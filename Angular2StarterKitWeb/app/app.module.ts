import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// used to create fake backend
import { MockBackend, MockConnection } from "@angular/http/testing";
import { BaseRequestOptions } from "@angular/http";

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

import { AuthGuard } from "./_guards/index";
import { AuthenticationService, UserService } from "./_services/index";
import { LoginComponent } from "./login/index";
import { RegisterComponent } from "./register/index";
import { HomeComponent } from "./home/index";
import { ExportReportComponent } from "./export/index";
import { Navbar } from "./navbar/index";
import {
  Dashboard,
  DashboardDesigner,
  IzendaHome,
  IzendaSetting,
  ReportCustomFilter,
  ReportDesigner,
  ReportList,
  ReportPart,
  ReportViewer
} from "./izendacomponents/index";
import { IzendaIntegrate } from "./_helpers/izendaintegrate";
import { UrlSerializer } from "@angular/router";
import { CustomUrlSerializer } from "./_helpers/customurlserializer";

//import './izenda/izenda-ui.css';
//let IzendaBI =  './izenda/izenda_ui';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, routing],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ExportReportComponent,
    Dashboard,
    DashboardDesigner,
    IzendaHome,
    IzendaSetting,
    ReportCustomFilter,
    ReportDesigner,
    ReportList,
    ReportPart,
    ReportViewer,
    Navbar
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    IzendaIntegrate,
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

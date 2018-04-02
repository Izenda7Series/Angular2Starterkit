import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// used to create fake backend
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { Routing } from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { ExportReportComponent, ExportReportViewerComponent, ExportDashboardViewerComponent } from './export/index';
import { NavbarComponent } from './navbar/index';
import {
  DashboardComponent,
  DashboardDesignerComponent,
  IzendaHomeComponent,
  IzendaSettingComponent,
  ReportCustomFilterComponent,
  ReportDesignerComponent,
  ReportListComponent,
  ReportPartComponent,
  AdvancedReportPartComponent,
  ReportViewerComponent,
  DashboardViewerComponent
} from './izendacomponents/index';
import { IzendaIntegrate } from './_helpers/izendaintegrate';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ExportReportComponent,
    ExportReportViewerComponent,
    ExportDashboardViewerComponent,
    DashboardComponent,
    DashboardDesignerComponent,
    IzendaHomeComponent,
    IzendaSettingComponent,
    ReportCustomFilterComponent,
    ReportDesignerComponent,
    ReportListComponent,
    ReportPartComponent,
    AdvancedReportPartComponent,
    ReportViewerComponent,
    DashboardViewerComponent,
    NavbarComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    IzendaIntegrate,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

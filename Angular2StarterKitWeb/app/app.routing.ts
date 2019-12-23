import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';
import { ExportReportComponent, ExportReportViewerComponent, ExportDashboardViewerComponent } from './export/index';
import {Dashboard, DashboardDesigner, IzendaHome, IzendaSetting, ReportCustomFilter, ReportDesigner, ReportList, ReportPart, AdvancedReportPart, ReportViewer, DashboardViewer} from './izendacomponents/index'

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'izenda', component: IzendaHome, canActivate: [AuthGuard]},
    { path: 'izenda/settings', component: IzendaSetting, canActivate: [AuthGuard]},
    { path: 'izenda/reportdesigner', component: ReportDesigner, canActivate: [AuthGuard]},
    { path: 'izenda/report', component: ReportList, canActivate: [AuthGuard]},
    { path: 'izenda/reportviewer', component: ReportViewer, canActivate: [AuthGuard]},
    { path: 'izenda/reportcustomfilter', component: ReportCustomFilter, canActivate: [AuthGuard]},
    { path: 'izenda/reportpart', component: ReportPart, canActivate: [AuthGuard]},
    { path: 'izenda/advancedreportpart', component: AdvancedReportPart},
    { path: 'izenda/dashboarddesigner', component: DashboardDesigner, canActivate: [AuthGuard]},
    { path: 'izenda/dashboard', component: Dashboard, canActivate: [AuthGuard]},
    { path: 'izenda/dashboardviewer', component: DashboardViewer, canActivate: [AuthGuard]},
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },

    // subreports
    { path: 'izenda/report/view/:id', component: ReportViewer, canActivate: [AuthGuard]},

    // export route
    { path: 'viewer/reportpart/:id', component: ExportReportComponent},
    { path: 'report/view/:id', component: ExportReportViewerComponent},
    { path: 'dashboard/edit/:id', component: ExportDashboardViewerComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);

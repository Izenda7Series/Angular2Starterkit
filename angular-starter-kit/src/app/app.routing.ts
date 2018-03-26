import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';
import { ExportReportComponent, ExportReportViewerComponent, ExportDashboardViewerComponent } from './export/index';
import { DashboardComponent, DashboardDesignerComponent, IzendaHomeComponent, IzendaSettingComponent, ReportCustomFilterComponent,
    ReportDesignerComponent, ReportListComponent, ReportPartComponent,
    AdvancedReportPartComponent, ReportViewerComponent, DashboardViewerComponent } from './izendacomponents/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'izenda', component: IzendaHomeComponent, canActivate: [AuthGuard]},
    { path: 'izenda/settings', component: IzendaSettingComponent, canActivate: [AuthGuard]},
    { path: 'izenda/reportdesigner', component: ReportDesignerComponent, canActivate: [AuthGuard]},
    { path: 'izenda/report', component: ReportListComponent, canActivate: [AuthGuard]},
    { path: 'izenda/reportviewer', component: ReportViewerComponent, canActivate: [AuthGuard]},
    { path: 'izenda/reportcustomfilter', component: ReportCustomFilterComponent, canActivate: [AuthGuard]},
    { path: 'izenda/reportpart', component: ReportPartComponent, canActivate: [AuthGuard]},
    { path: 'izenda/advancedreportpart', component: AdvancedReportPartComponent},
    { path: 'izenda/dashboarddesigner', component: DashboardDesignerComponent, canActivate: [AuthGuard]},
    { path: 'izenda/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'izenda/dashboardviewer', component: DashboardViewerComponent, canActivate: [AuthGuard]},
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },

    // export route
     { path: 'viewer/reportpart/:id', component: ExportReportComponent},
     { path: 'report/view/:id', component: ExportReportViewerComponent},
     { path: 'dashboard/edit/:id', component: ExportDashboardViewerComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);

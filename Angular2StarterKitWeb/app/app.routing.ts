import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';
import { ExportReportComponent, ExportReportViewerComponent, ExportDashboardViewerComponent } from './export/index';
import {Dashboard, DashboardDesigner, IzendaHome, IzendaSetting, ReportCustomFilter, ReportDesigner, ReportList, ReportPart, ReportViewer, DashboardViewer} from './izendacomponents/index'

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'izenda', component: IzendaHome},    
    { path: 'izenda/settings', component: IzendaSetting},    
    { path: 'izenda/reportdesigner', component: ReportDesigner},    
    { path: 'izenda/report', component: ReportList},    
    { path: 'izenda/reportviewer', component: ReportViewer},    
    { path: 'izenda/reportcustomfilter', component: ReportCustomFilter},    
    { path: 'izenda/reportpart', component: ReportPart},    
    { path: 'izenda/dashboarddesigner', component: DashboardDesigner},    
    { path: 'izenda/dashboard', component: Dashboard},
    { path: 'izenda/dashboardviewer', component: DashboardViewer},
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },

    // export route
     { path: 'viewer/reportpart/:id', component: ExportReportComponent},   
     { path: 'report/view/:id', component: ExportReportViewerComponent},   
     { path: 'dashboard/view/:id', component: ExportDashboardViewerComponent}, 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
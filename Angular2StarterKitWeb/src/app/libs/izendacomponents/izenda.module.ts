import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../auth/guard/auth.guard';

import {
	IzendaHome,
	IzendaSetting,
	ReportDesigner,
	ReportList,
	ReportViewer,
	ReportCustomFilter,
	ReportPart,
	AdvancedReportPart,
	DashboardDesigner,
	Dashboard,
	DashboardViewer
} from './components';

const ROUTES: Routes = [
	{
		path: 'izenda',
		component: IzendaHome,
		canActivate: [AuthGuard]
	}, {
		path: 'izenda/settings',
		component: IzendaSetting,
		canActivate: [AuthGuard]
	}, {
		path: 'izenda/reportdesigner',
		component: ReportDesigner,
		canActivate: [AuthGuard]
	}, {
		path: 'izenda/report',
		component: ReportList,
		canActivate: [AuthGuard]
	}, {
		path: 'izenda/reportviewer',
		component: ReportViewer,
		canActivate: [AuthGuard]
	}, {
		path: 'izenda/reportcustomfilter',
		component: ReportCustomFilter,
		canActivate: [AuthGuard]
	}, {
		path: 'izenda/reportpart',
		component: ReportPart,
		canActivate: [AuthGuard]
	}, {
		path: 'izenda/advancedreportpart',
		component: AdvancedReportPart
	}, {
		path: 'izenda/dashboarddesigner',
		component: DashboardDesigner,
		canActivate: [AuthGuard]
	}, {
		path: 'izenda/dashboard',
		component: Dashboard,
		canActivate: [AuthGuard]
	}, {
		path: 'izenda/dashboardviewer',
		component: DashboardViewer,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ROUTES)
	],
	declarations: [
		IzendaHome,
		IzendaSetting,
		ReportDesigner,
		ReportList,
		ReportViewer,
		ReportCustomFilter,
		ReportPart,
		AdvancedReportPart,
		DashboardDesigner,
		Dashboard,
		DashboardViewer
	],
	providers: [],
	exports: [
		IzendaHome,
		IzendaSetting,
		ReportDesigner,
		ReportList,
		ReportViewer,
		ReportCustomFilter,
		ReportPart,
		AdvancedReportPart,
		DashboardDesigner,
		Dashboard,
		DashboardViewer
	]
})
export class IzendaModule { }
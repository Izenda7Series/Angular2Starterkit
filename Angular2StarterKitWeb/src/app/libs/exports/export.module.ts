import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {
	ExportReportComponent,
	ExportReportViewerComponent,
	ExportDashboardViewerComponent
} from './components';

const ROUTES: Routes = [
	{
		path: 'viewer/reportpart/:id',
		component: ExportReportComponent
	}, {
		path: 'report/view/:id',
		component: ExportReportViewerComponent
	}, {
		path: 'dashboard/edit/:id',
		component: ExportDashboardViewerComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(ROUTES, { enableTracing: true })
	],
	declarations: [
		ExportReportComponent,
		ExportReportViewerComponent,
		ExportDashboardViewerComponent
	],
	providers: [],
	exports: [
		ExportReportComponent,
		ExportReportViewerComponent,
		ExportDashboardViewerComponent
	]
})
export class ExportModule { }
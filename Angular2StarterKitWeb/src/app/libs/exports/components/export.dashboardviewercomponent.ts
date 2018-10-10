import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// let IzendaSynergy = require("./../../../assets/izenda/izenda_ui");
import { IzendaIntegrate } from '../../../_helpers';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Store } from 'store';

@Component({
	selector: 'export-dashboard',
	template: `<div id="izenda-export-dashboardviewer"></div>`
})

export class ExportDashboardViewerComponent implements OnInit, AfterViewInit {
	currentUserContext: any = {};
	reportId: string;
	urlParams: Observable<any>;

	constructor(private store: Store, private activatedRoute: ActivatedRoute, private izItergrate: IzendaIntegrate) { }

	ngOnInit() {
		this.urlParams = Observable.combineLatest(
			this.activatedRoute.params,
			this.activatedRoute.queryParams,
			this.store.select('user'),
			(params, queryParams, user) => ({ ...params, ...queryParams, ...user })
		);
	}

	ngAfterViewInit() {
		this.urlParams.subscribe(routerParams => {
			this.reportId = routerParams.id;

			const reportParams = {
				id: routerParams.id,
				useQueryParam: true
			};
			const selector = document.querySelector('#izenda-export-dashboardviewer');

			return this.izItergrate.renderReport(selector, reportParams);

			// this.currentUserContext = {
			//     token: routerParams.izendaToken
			// };

			// IzendaSynergy.setCurrentUserContext({
			//     token: routerParams.izendaToken
			// });
			// IzendaSynergy.renderReportPart(document.querySelector('#izenda-export-dashboardviewer'), {
			//     "id": this.reportId,
			//     "useQueryParam": true
			// });
		});
	}
}
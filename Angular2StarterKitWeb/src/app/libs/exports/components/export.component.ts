import { Component, OnInit, AfterViewInit, AfterContentInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// let IzendaSynergy = require("./../../../assets/izenda/izenda_ui");
import { IzendaIntegrate } from '../../../_helpers';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Store } from 'store';

@Component({
	selector: 'export-component',
	templateUrl: 'export.component.html'
})

export class ExportReportComponent implements OnInit, AfterViewInit, AfterContentInit {
	reportId: string = '6345391a-7015-452b-89db-7859b8eb0eda';
	currentUserContext: any = {};
	reportPartId: string;
	urlParams: Observable<any>;

	constructor(private activatedRoute: ActivatedRoute, private store: Store, private izItergrate: IzendaIntegrate) { }

	ngOnInit() {
		// this.urlParams = Observable.combineLatest(
		//     this.activatedRoute.params,
		//     this.activatedRoute.queryParams,
		//     this.store.select('user'),
		//     (params, queryParams, user) => ({ ...params, ...queryParams, ...user })
		// );
		this.urlParams = Observable.combineLatest(
			this.activatedRoute.params,
			this.store.select('user'),
			(params, user) => ({ ...params, ...user })
		);
	}

	ngAfterViewInit() {
		this.urlParams.subscribe(routerParams => {
			this.reportPartId = routerParams.id;
			const reportParams = {
				id: this.reportId,
				useQueryParam: true
			};
			const selector = document.querySelector('#izenda-export-reportpart');

			this.izItergrate.renderReport(selector, reportParams);
		});
		// this.urlParams.subscribe(routerParams => {
		//     this.reportPartId = routerParams.id;

		// this.currentUserContext = {
		//     token: routerParams.izendaToken
		// };

		// IzendaSynergy.setCurrentUserContext({
		//     token: routerParams.izendaToken
		// });
		// const reportParams = {
		//     id: routerParams.id,
		//     useQueryParam: true
		// };
		// const selector = document.querySelector('#izenda-export-reportpart');

		// return this.izItergrate.renderReport(selector, reportParams);
		// IzendaSynergy.renderReportPart(document.querySelector('#izenda-export-reportpart'), {
		//     "id": this.reportPartId,
		//     "useQueryParam": true
		// });
		//});
	}

	ngAfterContentInit() {
		// this.urlParams.subscribe(routerParams => {
		// 	this.reportPartId = routerParams.id;
		// 	const reportParams = {
		// 		id: this.reportId,
		// 		useQueryParam: true
		// 	};
		// 	const selector = document.querySelector('#izenda-export-reportpart');

		// 	return this.izItergrate.renderReport(selector, reportParams);
		// });
	}
	export() {
		this.urlParams.subscribe(routerParams => {
			this.reportPartId = routerParams.id;
			const reportParams = {
				id: routerParams.id,
				useQueryParam: true
			};
			const selector = document.querySelector('#izenda-export-reportpart');

			return this.izItergrate.renderReport(selector, reportParams);
		});
	}
}
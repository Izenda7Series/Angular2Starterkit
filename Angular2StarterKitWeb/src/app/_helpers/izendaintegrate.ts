import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../auth/shared/model/user.model';
import { Store } from 'store';

let iIzendaSynergy = require("./../../izenda/izenda_ui");

@Injectable()
export class IzendaIntegrate {

	IzendaSynergy = iIzendaSynergy;
	currentUser: User;

	constructor(private router: Router, private store: Store) {
		this.store.select('user').subscribe((user: User) => {
			const izendaToken = user.izendaToken;
			this.IzendaSynergy.setCurrentUserContext({ token: izendaToken });
		});
	}

	DoIzendaConfig(): void {
		this.IzendaSynergy.config({
			"WebApiUrl": "http://localhost:7001/api/",
			"BaseUrl": "/",
			"RootPath": "./izenda",
			"CssFile": "izenda-ui.css",
			"Routes": {
				"ReportDesigner": "reportdesigner",
				"Report": "report",
				"ReportViewer": "reportviewer",
				"ReportViewerPopup": "reportviewerpopup",
				"Viewer": "viewer",
				"Dashboard": "dashboard",
				"New": "new",
				"Settings": "settings",
				"Account": "account",
				"MyProfile": "myprofile"
			},
			"TimeOut": 7200,
			"NeedToEncodeUrl": true,
			"OnReceiveUnauthorizedResponse": this.redirectToLoginPage
		});
	}

	redirectToLoginPage() {
		console.log("Current user is unauthorized to access Izenda function. Navaigate to login page");
		this
			.router
			.navigate(['/login']);
	}

	setContext() {
		// this.store.select('user').subscribe((user: User) => {
		//     const izendaToken = user.izendaToken;
		//     this.IzendaSynergy.setCurrentUserContext({ token: izendaToken });
		// });
	}

	/* Izenda Function */

	RenderIzenda() {
		//this.setContext();
		let dom = document.getElementById('izenda-root');
		this.IzendaSynergy.render(dom);
		return dom;
	}

	RenderIzendaSettings() {
		//this.setContext();
		let dom = document.getElementById('izenda-root');
		this.IzendaSynergy.renderSettingPage(dom);
		return dom;
	}

	RenderReportList() {
		//this.setContext();
		let dom = document.getElementById('izenda-root');
		this.IzendaSynergy.renderReportPage(dom);
		return dom;
	}

	RenderReportDesigner(): any {
		//this.setContext();
		let dom = document.getElementById('izenda-root');
		this.IzendaSynergy.renderReportDesignerPage(dom);
		return dom;
	}

	RenderReportViewer() {
		//this.setContext();
		let dom = document.querySelector('#izenda-root');
		this.IzendaSynergy.renderReportViewerPage(dom, '[your report id]');
		return dom;
	}

	RenderReportCustomizedFilterViewer() {
		//this.setContext();
		let filtersObj: any = {
			"filters": [],
			"overridingFilterValue": { // filter object to pass to api
				p1value: 50, // override filter value at position 1 which is applying on current report, change >30 to >50
				p2value: '30;#40' // override filter value at position 2 which is applying on current report, change beetween (20:50) to (30:40)
			}
		};

		let dom = document.getElementById('izenda-root');
		this.IzendaSynergy.renderReportViewerPage(dom, '[your report id]', filtersObj);
		return dom;
	}

	RenderReportParts() {
		//debugger;
		//this.setContext();
		this.IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part1'), { "id": "[your 1st report part id]" });

		this.IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part2'), { "id": "[your 2nd report part id]" });

		this.IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part3'), { "id": "[your 3rd report part id]" });

	}

	UpdateResultReportPart(reportPartId: string, overridingFilterValue: any, containerId: string) {
		//this.setContext();
		this.IzendaSynergy.renderReportPart(document.getElementById(containerId), {
			"id": reportPartId,
			"overridingFilterValue": overridingFilterValue
		});
	}

	RenderSingleReportPart(reportPartId: string, containerId: string) {
		//this.setContext();
		this.IzendaSynergy.renderReportPart(document.getElementById(containerId), { "id": reportPartId });
	}

	RenderDashboard() {
		//this.setContext();
		let dom = document.getElementById('izenda-root');
		this.IzendaSynergy.renderDashboardPage(dom);
		return dom;
	}

	RenderDashboardDesigner() {
		//this.setContext();
		let dom = document.getElementById('izenda-root');
		this.IzendaSynergy.renderNewDashboardPage(dom);
		return dom;
	}

	RenderDashboardViewer() {
		// this.setContext();
		let dom = document.getElementById('izenda-root');
		this.IzendaSynergy.renderDashboardViewerPage(dom, '[your dashboard id]');
		return dom;
	}

	DestroyDom(dom: any) {
		//this.setContext();
		this.IzendaSynergy.unmountComponent(dom);
	}

	/* Izenda Helper Function */

	AutoHideIzenaProgressBar() {
		this.HideIzenaProgressBar("izenda-root", "progressLoader");
	}

	HideIzenaProgressBar(targetId: string, progressBarId: string) {
		// select the target node
		var target = document.getElementById(targetId);

		var observer = new MutationObserver(function (mutations) {
			mutations
				.forEach(function (mutation) {
					let progressBar = document.getElementById(progressBarId);
					if (progressBar) {
						progressBar.style.display = 'none';
					}
				});
		});

		// configuration of the observer:
		var config = {
			attributes: true,
			childList: true,
			characterData: true
		};
		if (target) {
			// pass in the target node, as well as the observer options
			observer.observe(target, config);
		}
	}

	renderReport(selector: any, params: any) {
		return this.IzendaSynergy.renderReportPart(selector, params);
		// evoPdfConverter.startConversion();
		// setTimeout(function () {
		// 	if (typeof evoPdfConverter === 'undefined') {
		// 		selector.append('<h1>evoPdfConverter is undefined here!</h1>');
		// 		return '<h1>evoPdfConverter is undefined here!</h1>'
		// 	} else {
		// 		//this.IzendaSynergy.renderReportPart(selector, params);
		// 		evoPdfConverter.startConversion();
		// 		selector.append('<h1>Can print!</h1>');
		// 		return '<h1>Can print!</h1>'
		// 	}
		// }, 6000);
	}

}

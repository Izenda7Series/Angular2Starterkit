import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { IzendaIntegrate } from "../../../_helpers";

@Component({
	selector: 'report-dashboardviewer',
	templateUrl: './../shared/rootcontainer.html'
})

export class DashboardViewer implements AfterViewInit,
	OnDestroy {
	dom: any = {};

	constructor(private izItergrate: IzendaIntegrate) { }

	ngAfterViewInit() {
		this.dom = this
			.izItergrate
			.RenderDashboardViewer();
		this
			.izItergrate
			.AutoHideIzenaProgressBar();
	}

	ngOnDestroy() {
		this
			.izItergrate
			.DestroyDom(this.dom);
	}
}

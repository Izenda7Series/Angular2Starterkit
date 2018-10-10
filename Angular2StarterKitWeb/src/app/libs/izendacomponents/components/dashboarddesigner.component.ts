import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { IzendaIntegrate } from "../../../_helpers";

@Component({
	selector: 'report-designer',
	templateUrl: './../shared/rootcontainer.html'
})

export class DashboardDesigner implements AfterViewInit,
	OnDestroy {
	dom: any = {};

	constructor(private izItergrate: IzendaIntegrate) { }

	ngAfterViewInit() {
		this.dom = this
			.izItergrate
			.RenderDashboardDesigner();
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

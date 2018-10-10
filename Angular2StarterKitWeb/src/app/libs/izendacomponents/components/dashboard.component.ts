import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { IzendaIntegrate } from "../../../_helpers";

@Component({
	selector: 'report-dashboard',
	templateUrl: './../shared/rootcontainer.html'
})

export class Dashboard implements AfterViewInit,
	OnDestroy {
	dom: any = {};

	constructor(private izItergrate: IzendaIntegrate) { }

	ngAfterViewInit() {
		this.dom = this
			.izItergrate
			.RenderDashboard();
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

import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IzendaIntegrate } from '../../../_helpers';

@Component({
	selector: 'report-customviewer',
	templateUrl: './../shared/rootcontainer.html'
})

export class ReportViewer implements AfterViewInit,
	OnDestroy {
	dom: any = {};

	constructor(private izItergrate: IzendaIntegrate) { }

	ngAfterViewInit() {
		this.dom = this
			.izItergrate
			.RenderReportViewer();
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
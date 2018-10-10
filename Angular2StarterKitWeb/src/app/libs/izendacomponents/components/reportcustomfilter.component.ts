import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IzendaIntegrate } from '../../../_helpers';

@Component({
	selector: 'report-customfilter',
	templateUrl: './../shared/rootcontainer.html'
})

export class ReportCustomFilter implements AfterViewInit,
	OnDestroy {
	dom: any = {};

	constructor(private izItergrate: IzendaIntegrate) { }

	ngAfterViewInit() {
		this.dom = this
			.izItergrate
			.RenderReportCustomizedFilterViewer();
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
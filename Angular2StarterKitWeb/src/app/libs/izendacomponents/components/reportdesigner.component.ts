import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IzendaIntegrate } from '../../../_helpers';

@Component({
	selector: 'report-customdesigner',
	templateUrl: './../shared/rootcontainer.html'
})

export class ReportDesigner implements AfterViewInit,
	OnDestroy {
	dom: any = {};
	constructor(private izItergrate: IzendaIntegrate) { }

	ngAfterViewInit() {
		this.dom = this
			.izItergrate
			.RenderReportDesigner();
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
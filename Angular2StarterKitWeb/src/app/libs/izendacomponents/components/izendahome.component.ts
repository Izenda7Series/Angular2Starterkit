import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IzendaIntegrate } from '../../../_helpers';

@Component({
	selector: 'izenda-home',
	templateUrl: './../shared/rootcontainer.html'
})

export class IzendaHome implements AfterViewInit, OnDestroy {
	dom: any = {};

	constructor(private izItergrate: IzendaIntegrate) { }

	ngAfterViewInit() {
		this.dom = this
			.izItergrate
			.RenderIzenda();
	}

	ngOnDestroy() {
		this
			.izItergrate
			.DestroyDom(this.dom);
	}
}
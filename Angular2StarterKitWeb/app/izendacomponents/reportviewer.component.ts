import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import {IzendaIntegrate} from '../_helpers/izendaintegrate';


@Component({
    templateUrl: 'rootcontainer.html'
})

export class ReportViewer implements AfterViewInit, OnDestroy {
    dom: any = {};

    constructor(private izItergrate: IzendaIntegrate) {}

    ngAfterViewInit() {
        this.dom = this.izItergrate.RenderReportViewer();
    }
    
    ngOnDestroy() {
        this.izItergrate.DestroyDom(this.dom);
    }
}
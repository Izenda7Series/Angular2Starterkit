import { Component, AfterViewInit } from '@angular/core';
import {IzendaIntegrate} from '../_helpers/izendaintegrate';


@Component({
    moduleId: module.id,
    templateUrl: 'rootcontainer.html'
})

export class ReportCustomFilter implements AfterViewInit {
    constructor(private izItergrate: IzendaIntegrate) {
     }

    ngAfterViewInit() {
        this.izItergrate.RenderReportCustomizedFilterViewer();
    }
}
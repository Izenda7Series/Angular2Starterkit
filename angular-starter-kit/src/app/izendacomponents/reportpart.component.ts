import { Component, AfterViewInit } from '@angular/core';
import {IzendaIntegrate} from '../_helpers/izendaintegrate';


@Component({
    templateUrl: 'reportpart.component.html'
})

export class ReportPartComponent implements AfterViewInit {

    constructor(private izItergrate: IzendaIntegrate) {
     }

    ngAfterViewInit() {
        this.izItergrate.RenderReportParts();
    }
}

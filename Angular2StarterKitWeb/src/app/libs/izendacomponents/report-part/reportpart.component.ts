import {Component, AfterViewInit} from '@angular/core';
import {IzendaIntegrate} from '../../../_helpers';

@Component({templateUrl: 'reportpart.component.html'})

export class ReportPart implements AfterViewInit {

    constructor(private izItergrate : IzendaIntegrate) {}

    ngAfterViewInit() {
        this
            .izItergrate
            .RenderReportParts();
    }
}
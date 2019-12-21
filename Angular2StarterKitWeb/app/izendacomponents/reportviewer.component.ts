import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import {IzendaIntegrate} from '../_helpers/izendaintegrate';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: 'rootcontainer.html'
})

export class ReportViewer implements AfterViewInit, OnDestroy {
    dom: any = {};

    constructor(private izItergrate: IzendaIntegrate, private activatedRoute: ActivatedRoute) {}

    ngAfterViewInit() {
        let reportId = null;
        this.activatedRoute.params.subscribe((params: Params) => {
            reportId = params['id'];
        });

        let filters = null;
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            const overridingFilterValue = {};
            Object.keys(params).forEach(function(key) {
                overridingFilterValue[key] = decodeURIComponent(params[key]);
            });
            filters = { overridingFilterValue: overridingFilterValue };
        });

        this.dom = this.izItergrate.RenderReportViewer(reportId, filters);
        this.izItergrate.AutoHideIzenaProgressBar();
    }
    
    ngOnDestroy() {
        this.izItergrate.DestroyDom(this.dom);
    }
}
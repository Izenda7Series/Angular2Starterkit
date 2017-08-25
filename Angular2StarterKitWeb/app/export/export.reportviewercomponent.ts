import { Component, AfterViewInit } from '@angular/core';

import { User } from '../_models/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
let IzendaSynergy = require("../../assets//izenda/izenda_ui");

@Component({
    templateUrl: 'export.reportviewer.html'
})

export class ExportReportViewerComponent implements AfterViewInit {
    currentUserContext: any = {};
   repportId: string;
    constructor( private router: Router, private activatedRoute: ActivatedRoute) { 
    }

    ngAfterViewInit() {
        console.log(this.activatedRoute);
        this.activatedRoute.params.subscribe((params: Params) => {
            this.repportId = params['id'];
        });

        this.activatedRoute.queryParams.subscribe((params: Params) => {
            let token = params['token'];
            this.currentUserContext = { token: token};
        });

        console.log(this.repportId);
        console.log(this.currentUserContext);
        IzendaSynergy.setCurrentUserContext(this.currentUserContext); 
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-export-reportviewer'), {
                "id": this.repportId,
                "useQueryParam":true,
            });
    }
}
import { Component, AfterViewInit } from '@angular/core';
// let IzendaSynergy = require("../izenda/izenda_ui");
import {IzendaIntegrate} from '../_helpers/izendaintegrate';


@Component({
    moduleId: module.id,
    templateUrl: 'rootcontainer.html'
})

export class DashboardViewer implements AfterViewInit {
    constructor(private izItergrate: IzendaIntegrate) {
     }

    ngAfterViewInit() {
        this.izItergrate.RenderDashboardViewer();
    }
}
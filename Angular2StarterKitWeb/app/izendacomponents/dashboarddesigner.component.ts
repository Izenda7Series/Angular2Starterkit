import { Component, AfterViewInit } from '@angular/core';
let IzendaSynergy = require("../izenda/izenda_ui");

@Component({
    moduleId: module.id,
    templateUrl: 'rootcontainer.html'
})

export class DashboardDesigner implements AfterViewInit {
    currentUserContext: any = {};
    ngAfterViewInit() {
        this.currentUserContext = { token: localStorage.getItem("izendatoken")};   
        IzendaSynergy.setCurrentUserContext(this.currentUserContext);
        IzendaSynergy.renderNewDashboardPage(document.getElementById('izenda-root'));
    }
}
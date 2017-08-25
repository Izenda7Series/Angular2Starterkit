import { Component, AfterViewInit } from '@angular/core';
let IzendaSynergy = require("../../assets//izenda/izenda_ui");

@Component({
    templateUrl: 'rootcontainer.html'
})

export class Dashboard implements AfterViewInit {
    currentUserContext: any = {};

    ngAfterViewInit() {
        this.currentUserContext = { token: localStorage.getItem("izendatoken")};   
        IzendaSynergy.setCurrentUserContext(this.currentUserContext);
        IzendaSynergy.renderDashboardPage(document.getElementById('izenda-root'));
    }
}
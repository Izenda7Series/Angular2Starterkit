import { Component, AfterViewInit } from '@angular/core';
import {IzendaIntegrate} from '../_helpers/izendaintegrate';

@Component({
    templateUrl: 'rootcontainer.html'
})



export class IzendaSetting implements AfterViewInit {
    constructor(private izItergrate: IzendaIntegrate) {
     }

    ngAfterViewInit() {
        this.izItergrate.RenderIzendaSettings();
    }
}
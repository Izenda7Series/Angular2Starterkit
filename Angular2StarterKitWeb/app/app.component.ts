import { Component } from '@angular/core';
import {IzendaIntegrate} from './_helpers/izendaintegrate';
import { Router } from '@angular/router';
import "./app.css";
import "./izenda/izenda-ui.css";

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent { 
    
    constructor(private router: Router, private izItergrate: IzendaIntegrate) {
        this.izItergrate.DoIzendaConfig();
     }

    logout()
    {
        this.router.navigate(['/login']);
    }

}
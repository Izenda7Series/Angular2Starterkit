import { Component } from '@angular/core';
import {IzendaIntegrate} from './_helpers/izendaintegrate';
import { Router } from '@angular/router';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/app.css";
import "../assets/izenda/izenda-ui.css";

@Component({
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
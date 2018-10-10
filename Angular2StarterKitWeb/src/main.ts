import 'reflect-metadata';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

import 'jquery';
import 'bootstrap';

import '../assets/scss/_global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./izenda/izenda-ui.css";

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if (process.env.NODE_ENV === 'production') {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

import { Component } from '@angular/core';

@Component({
	selector: 'not-found',
	styleUrls: ['not-found.component.scss'],
	template: `
		<div class="not-found">
			<h1>404 - Not Found</h1>
		</div>
	`
})
export class NotFoundComponent {
	constructor() { }
}
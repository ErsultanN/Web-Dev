import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-launch-filter',
  template: '<button (click)="filterSuccessful()">Show Successful Launches</button> <button (click)="filterUpcoming()">Show Upcoming Launches</button>',
  styleUrl: './launch-filter.component.css'
})
export class LaunchFilterComponent {

  @Output() filter = new EventEmitter<void>();

}

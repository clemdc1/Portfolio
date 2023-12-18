import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('buttonAnimation', [
      state(
        'inactive',
        style({
          transform: 'translateY(0)',
        })
      ),
      state(
        'active',
        style({
          transform: 'translateY(-10px)',
        })
      ),
      transition('inactive <=> active', animate('0.2s ease-in')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  state = 'inactive';

  ngOnInit() {
    setInterval(() => {
      this.toggleState();
    }, 1000); // Change the interval as needed (1000ms = 1 second)
  }

  toggleState() {
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }
}

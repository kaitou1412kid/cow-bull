import { Component } from '@angular/core';

@Component({
  selector: 'app-enternum',
  standalone: true,
  imports: [],
  templateUrl: './enternum.component.html',
  styleUrl: './enternum.component.css'
})
export class EnternumComponent {
  isVisible = false;
  guess: number = 0;

  onVisible(){
    this.isVisible = true;
  }

  offVisible(){
    this.isVisible = false;
  }
}

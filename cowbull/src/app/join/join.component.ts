import { Component } from '@angular/core';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [],
  templateUrl: './join.component.html',
  styleUrl: './join.component.css'
})
export class JoinComponent {
  isVisible = false;

  openPopup(){
    this.isVisible = true;
  }

  closePopup(){
    this.isVisible = false;
  }
}

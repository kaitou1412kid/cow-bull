import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameComponent } from "../game/game.component";
import { EnternumComponent } from "../enternum/enternum.component";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [GameComponent, EnternumComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  roomId: string = '';

  constructor(private route: ActivatedRoute){}

  ngOnInit():void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
  }
}

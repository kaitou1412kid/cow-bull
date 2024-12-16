import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameComponent } from "../game/game.component";
import { EnternumComponent } from "../enternum/enternum.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [GameComponent, EnternumComponent, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  roomId: string = '';
  players: string[] = [];
  roomData: any;
  constructor(private route: ActivatedRoute){}

  ngOnInit():void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.roomData = history.state.roomData;
    this.players = this.roomData.players;
  }
}

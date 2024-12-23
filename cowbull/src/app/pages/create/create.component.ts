import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameComponent } from "../game/game.component";
import { EnternumComponent } from "../enternum/enternum.component";
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../services/websocket.service';

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
  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService){}

  ngOnInit():void {
    // this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.webSocketService.connect();
    this.webSocketService.subscribeToLobby((room) => {
      this.roomId = room.roomId;
      this.players = room.players;
    })
    // this.roomData = history.state.roomData;
    // this.players = this.roomData.players;
  }
}

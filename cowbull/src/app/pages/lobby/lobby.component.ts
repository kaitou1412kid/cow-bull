import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';

interface Player {
  id: number,
  name: string,
  isReady: boolean
}

export interface LobbyState{
  id: string,
  players: Player[]
}

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent implements OnInit, OnDestroy {
  roomCode: string = "";
  private stateSubscription!: Subscription;
  lobbyState: LobbyState | null = null;
  messages: any[] = [];
  players: Player[] = [
    { id: 1, name: 'Player 1', isReady: false },
    { id: 2, name: 'Player 2', isReady: false },
  ];
  isDialogOpen = false;

  constructor(private route: ActivatedRoute, private wsService: WebsocketService) {
   }

  ngOnInit(): void {
    this.roomCode = this.route.snapshot.paramMap.get('id') || "";
    // this.wsService.connect();
    if(this.wsService.isConnected){
      this.wsService.sendRoomCode(this.roomCode);
      this.wsService.connectToLobby(this.roomCode);
    }else{
      console.log("not connected");
    }

    // setTimeout(() => {
    //   if(this.wsService.isConnected){
    //     this.wsService.connectToLobby(this.roomCode);
    //   }
    // },5000);

    // Subscribe to messages
    this.stateSubscription = this.wsService.lobbyState$.subscribe(
      state => {
        this.lobbyState = state;
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions and connection
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
    if(this.roomCode){

      this.wsService.disconnect(this.roomCode);
    }
  }

  sendMessage(content: string) {
    const message = {
      content: content,
      timestamp: new Date(),
      sender: 'currentUser' // Replace with actual user info
    };
    this.wsService.sendMessage(this.roomCode, message);
  }
  

  numberForm = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}$')
    ])
  });

  onStartGame() {
    this.isDialogOpen = true;
  }

  onSubmitNumber() {
    if (this.numberForm.valid) {
      console.log('Selected number:', this.numberForm.get('number')?.value);
      this.isDialogOpen = false;
      this.numberForm.reset();
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  get numberInvalid() {
    const control = this.numberForm.get('number');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get numberErrorMessage() {
    const control = this.numberForm.get('number');
    if (control?.hasError('required')) {
      return 'Number is required';
    }
    if (control?.hasError('pattern')) {
      return 'Number must be exactly 4 digits';
    }
    return '';
  }
}

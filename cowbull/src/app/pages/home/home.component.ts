import { Component, NgModule, OnInit } from '@angular/core';
// import { JoinComponent } from "../join/join.component";
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isDialogOpen = false;
  joinRoomForm = new FormGroup({
    roomCode: new FormControl('', Validators.required)
  })
  constructor(
    private router: Router,
    private roomService: RoomService,
    private wsService: WebsocketService
  ){}

  ngOnInit(): void {
    // this.wsService.connect();
  }

  onCreateRoom() {
    // Handle room creation logic here
    const id = this.generateId(5);
    this.roomService.createRoom(id).subscribe((response) => {
      let roomId = response.id;
      // this.wsService.sendRoomCode(roomId);
      this.router.navigate([`/lobby/${roomId}`],{state: {roomData: response}});
    })
  }

  onJoinRoom() {
    if (this.joinRoomForm.valid) {
      // Handle room joining logic here
      console.log('Joining room:', this.joinRoomForm.get('roomCode')?.value);
      const id = this.generateId(5);
      this.roomService.joinRoom(id, this.joinRoomForm.value.roomCode!).subscribe((response) => {
        let roomId = response.id;
        this.router.navigate([`/lobby/${roomId}`], {state: {roomData : response}});
        this.wsService.connectToLobby(roomId);
      })
      this.closeDialog();
      this.joinRoomForm.reset();
    }
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  // old code
  generateId(length: number){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = '';

    for(let i=0; i < length; i++){
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }

    return id;
  }

  createRoom(){
    const id = this.generateId(5);
    this.roomService.createRoom(id).subscribe((response) => {
      let roomId = response.id;
      this.router.navigate([`/room/${roomId}`],{state: {roomData: response}});
    })
  }
}

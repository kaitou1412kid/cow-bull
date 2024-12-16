import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './join.component.html',
  styleUrl: './join.component.css'
})
export class JoinComponent {
  isVisible = false;
  roomCode = new FormControl('');

  constructor(private router: Router, private roomService: RoomService){
  }

  generateId(length: number){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = '';

    for(let i=0; i < length; i++){
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }

    return id;
  }

  openPopup(){
    this.isVisible = true;
  }

  closePopup(){
    this.isVisible = false;
  }

  joinRoom(){
    const playerId = this.generateId(5);
    this.roomService.joinRoom(playerId, this.roomCode.value!).subscribe(
      (response) => {
        this.router.navigate([`/room/${this.roomCode.value}`], {state : {roomData: response}});
      }
    )
  }
}

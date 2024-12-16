import { Component, OnInit } from '@angular/core';
import { JoinComponent } from "../join/join.component";
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JoinComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(
    private router: Router,
    private roomService: RoomService
  ){}

  ngOnInit(): void {
    
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

  createRoom(){
    const id = this.generateId(5);
    this.roomService.createRoom(id).subscribe((response) => {
      let roomId = response.id;
      this.router.navigate([`/room/${roomId}`],{state: {roomData: response}});
    })
  }
}

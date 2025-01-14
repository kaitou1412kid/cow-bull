import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cowbull';

  constructor(private wsService: WebsocketService){}

  ngOnInit() {
    this.wsService.connect(); // Establish connection when the app initializes
  }
}

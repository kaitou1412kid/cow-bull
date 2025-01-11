// services/websocket.service.ts
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { LobbyState } from '../pages/lobby/lobby.component';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client;
  private messageSubject = new BehaviorSubject<any>(null);
  public messageObservable = this.messageSubject.asObservable();
  private lobbyStateSubject = new BehaviorSubject<LobbyState | null>(null);
  public lobbyState$ = this.lobbyStateSubject.asObservable();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        console.log('Connected to WebSocket');
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      }
    });
  }

  connect(lobbyId: string): void {
    this.stompClient.activate();
    
    // Subscribe to lobby-specific messages
    // this.stompClient.onConnect = () => {
    //   this.stompClient.subscribe(`/topic/lobby/${lobbyId}/state`, (message) => {
    //     const lobbyState = JSON.parse(message.body);
    //     this.lobbyStateSubject.next(lobbyState);
    //     console.log(message.body);
    //   });
    //   this.joinLobby(lobbyId);
    // };
    this.stompClient.onConnect = () => {
        this.stompClient.subscribe(`/topic/lobby/${lobbyId}`, (message) => {
          const lobbyState = JSON.parse(message.body);
          this.lobbyStateSubject.next(lobbyState);
          console.log(message.body);
        });
      };
  }

  disconnect(lobbyId: string): void {
    this.leaveLobby(lobbyId);
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }

  joinLobby(lobbyId: string): void {
    this.stompClient.publish({
      destination: `/app/lobby/${lobbyId}/join`,
      body: JSON.stringify({
        // Include player info from your auth service
        playerId: 'current-player-id',
        username: 'current-username'
      })
    });
  }

  leaveLobby(lobbyId: string): void {
    this.stompClient.publish({
      destination: `/app/lobby/${lobbyId}/leave`,
      body: JSON.stringify({
        playerId: 'current-player-id'
      })
    });
  }

  sendMessage(lobbyId: string, message: any): void {
    this.stompClient.publish({
      destination: `/app/lobby/${lobbyId}/message`,
      body: JSON.stringify(message)
    });
  }
}
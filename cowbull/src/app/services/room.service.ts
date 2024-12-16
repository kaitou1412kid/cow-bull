import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient) { }

  createRoom(ownerId: string): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/api/room/create?ownerId=${ownerId}`);
  }

  joinRoom(playerId: string, roomId: string): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/api/room/join?playerId=${playerId}&roomId=${roomId}`)
  }
}

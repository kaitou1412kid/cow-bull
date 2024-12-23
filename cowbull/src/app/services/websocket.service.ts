import { Injectable } from "@angular/core";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

@Injectable({
    providedIn : "root"
})
export class WebSocketService{
    private stompClient: any;

    connect(){
        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, () => {
            console.log('Websocket Connected.')
        });
    }

    subscribeToLobby(callback: (message: any) => void){
        this.stompClient.subscribe('/topic/lobby', (message:any)=>{
            callback(JSON.parse(message.body));
        });
    }

    createRoom(ownerId: string){
        this.stompClient.send('/room/create',{}, ownerId);
    }

    joinRoom(roomId: string, playerId: string){
        this.stompClient.send('/room/join',{}, JSON.stringify({roomId, playerId}));
    }
}
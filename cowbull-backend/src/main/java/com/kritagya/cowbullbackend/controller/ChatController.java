package com.kritagya.cowbullbackend.controller;

import com.kritagya.cowbullbackend.model.ChatMessage;
import com.kritagya.cowbullbackend.model.Player;
import com.kritagya.cowbullbackend.model.Room;
import com.kritagya.cowbullbackend.service.GameService;
import com.kritagya.cowbullbackend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final RoomService roomService;

    public ChatController(RoomService roomService) {
        this.roomService = roomService;
    }

    @MessageMapping("/lobby/{lobbyId}")
    @SendTo("/topic/lobby/{lobbyId}")
    public Room getRoomDetail(String roomId){
        return roomService.getRoom(roomId);
    }

    @MessageMapping("/lobby/{lobbyId}/join")
    @SendTo("/topic/lobby/{lobbyId}/state")
    public Room handleMessage(@DestinationVariable String lobbyId, Player player) throws Exception {
        return roomService.joinRoom(lobbyId, player.getId());
    }
}

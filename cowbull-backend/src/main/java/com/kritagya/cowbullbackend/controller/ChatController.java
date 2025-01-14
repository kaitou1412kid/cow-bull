package com.kritagya.cowbullbackend.controller;

import com.kritagya.cowbullbackend.model.ChatMessage;
import com.kritagya.cowbullbackend.model.Player;
import com.kritagya.cowbullbackend.model.Room;
import com.kritagya.cowbullbackend.service.GameService;
import com.kritagya.cowbullbackend.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class ChatController {
    private final RoomService roomService;

    public ChatController(RoomService roomService) {
        this.roomService = roomService;
    }

    @MessageMapping("/lobby/{lobbyId}")
    @SendTo("/topic/lobby/{lobbyId}")
    public Room getRoomDetail(@DestinationVariable String lobbyId){
        Room room = roomService.getRoom(lobbyId);
        log.info(room.toString());
        return room;
    }

    @MessageMapping("/lobby/{lobbyId}/join")
    @SendTo("/topic/lobby/{lobbyId}/state")
    public Room handleMessage(@DestinationVariable String lobbyId, String playerId) throws Exception {
        Room room1 = roomService.getRoom(lobbyId);
        log.info("Room detail: {}",room1.toString());
        Room room = roomService.joinRoom(lobbyId, playerId);
        log.info(room.toString());
        return room;
    }
}

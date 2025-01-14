package com.kritagya.cowbullbackend.controller;

import com.kritagya.cowbullbackend.model.Player;
import com.kritagya.cowbullbackend.model.Room;
import com.kritagya.cowbullbackend.service.GameService;
import com.kritagya.cowbullbackend.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@Slf4j
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private RoomService roomService;

    @GetMapping("/room/create")
    public Room createRoom(@RequestParam String ownerId) {
        Room room = roomService.createRoom(ownerId);
        log.info("Room created: {}", room);
        return room;
    }

    @GetMapping("/room/join")
    public Room joinRoom(@RequestParam String playerId, @RequestParam String roomId) throws Exception {
        return roomService.joinRoom(roomId, playerId);
    }

    @GetMapping("/room/start")
    public String startGame(@RequestParam String ownerId, @RequestParam String roomId) throws Exception {
        roomService.startGame(roomId, ownerId);
        return "Game Started";
    }

    @PostMapping("/guess")
    public Map<String, Object> makeGuess(@RequestParam String playerId, @RequestParam String opponentId, @RequestParam String guess){
        Player opponent = roomService.getPlayer(opponentId);
        Map<String, Integer> result = gameService.checkGuess(opponent.getSecretCode(), guess);
        boolean winner = gameService.checkWinner(opponent.getSecretCode(), guess);
        return Map.of("result", result, "winner", winner);
    }
}

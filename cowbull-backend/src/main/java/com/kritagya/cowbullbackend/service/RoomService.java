package com.kritagya.cowbullbackend.service;

import com.kritagya.cowbullbackend.model.Player;
import com.kritagya.cowbullbackend.model.Room;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomService {
    private final Map<String, Room> rooms = new HashMap<>();
    private final Map<String, Player> players = new HashMap<>();

    public Room createRoom(String ownerId){
        String roomId = UUID.randomUUID().toString().substring(0,5);
        Room room = new Room(roomId, ownerId, new ArrayList<>(List.of(ownerId)), false);
        rooms.put(roomId, room);
        return room;
    }

    public Room joinRoom(String roomId, String playerId) throws Exception{
        Room room = rooms.get(roomId);
        if(room == null || room.isStarted()){
            throw new Exception("Room not available");
        }
        if(room.getPlayers().size() >= 2){
            throw new Exception("Room is full.");
        }
        room.getPlayers().add(playerId);
        return room;
    }

    public void startGame(String roomId, String playerId) throws Exception{
        Room room = rooms.get(roomId);
        if(!room.getOwnerId().equals(playerId)){
            throw new Exception("Only the room owner can start the game.");
        }
        if(room.getPlayers().size() != 2){
            throw new Exception("Room must have exactly 2 players.");
        }
        room.setStarted(true);
    }

    public Player getPlayer(String playerId){
        return players.get(playerId);
    }

}

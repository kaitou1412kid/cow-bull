package com.kritagya.cowbullbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    private String id;
    private String ownerId;
    private List<String> players;
    private boolean started = false;
}

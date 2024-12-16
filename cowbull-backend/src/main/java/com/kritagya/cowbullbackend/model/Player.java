package com.kritagya.cowbullbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Player {
    private String id;
    private String secretCode;
    private boolean hasGuessedCorrectly = false;
}

package com.kritagya.cowbullbackend.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class GameService {
    public Map<String, Integer> checkGuess(String secretCode, String guess) {
        int bulls=0, cows=0;
        for(int i = 0;i < 4; i++){
            if(guess.charAt(i) == secretCode.charAt(i)){
                cows++;
            } else if (secretCode.contains(String.valueOf(guess.charAt(i)))) {
                bulls++;
            }
        }
        return Map.of("bulls", bulls, "cows", cows);
    }

    public boolean checkWinner(String secretCode, String guess) {
        return secretCode.equals(guess);
    }
}

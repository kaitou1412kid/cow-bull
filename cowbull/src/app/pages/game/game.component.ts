import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Guess {
  number: string;
  bulls: number;  // C (correct position)
  cows: number;   // B (wrong position)
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  guesses: Guess[] = [];
  targetNumber = '3279'; // Example target number
  showWinDialog = false;
  numberOfMoves = 0;

  constructor(private router: Router) {}

  guessForm = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}$')
    ])
  });

  onSubmitGuess() {
    if (this.guessForm.valid) {
      const guessedNumber = this.guessForm.get('number')?.value || '';
      const { bulls, cows } = this.calculateBullsAndCows(guessedNumber);
      
      this.numberOfMoves++;
      this.guesses.unshift({
        number: guessedNumber,
        bulls,
        cows
      });

      if (bulls === 4) {
        this.showWinDialog = true;
      }

      this.guessForm.reset();
    }
  }

  onPlayAgain() {
    // Reset the game state
    this.guesses = [];
    this.showWinDialog = false;
    this.numberOfMoves = 0;
    // In a real app, you'd generate a new target number here
  }

  onExit() {
    this.router.navigate(['/']); // Navigate to home page
  }

  private calculateBullsAndCows(guess: string): { bulls: number, cows: number } {
    let bulls = 0;
    let cows = 0;
    const targetArray = this.targetNumber.split('');
    const guessArray = guess.split('');

    // Calculate bulls (correct position)
    for (let i = 0; i < 4; i++) {
      if (guessArray[i] === targetArray[i]) {
        bulls++;
        targetArray[i] = 'X';
        guessArray[i] = 'Y';
      }
    }

    // Calculate cows (wrong position)
    for (let i = 0; i < 4; i++) {
      if (guessArray[i] !== 'Y') {
        const index = targetArray.indexOf(guessArray[i]);
        if (index !== -1) {
          cows++;
          targetArray[index] = 'X';
        }
      }
    }

    return { bulls, cows };
  }

  get numberInvalid() {
    const control = this.guessForm.get('number');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get numberErrorMessage() {
    const control = this.guessForm.get('number');
    if (control?.hasError('required')) {
      return 'Number is required';
    }
    if (control?.hasError('pattern')) {
      return 'Number must be exactly 4 digits';
    }
    return '';
  }
}

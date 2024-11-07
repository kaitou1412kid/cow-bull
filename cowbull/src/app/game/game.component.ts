import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  correctNumber: number = 1234;
  guesses: {value: number | null, disabled: boolean}[] = [{value:null, disabled:false}];
  isVisible = false;

  onVisible(){
    this.isVisible = true;
  }

  offVisible(){
    this.isVisible = false;
  }


  onGuess(index: number, value:string){
    const guess = parseInt(value, 10);
    if(guess === this.correctNumber){
      alert("You win");
    }else {
      this.guesses[index].disabled = true;
      this.guesses[index].value = guess;
      if(index === this.guesses.length - 1){
        this.guesses.push({value:null, disabled:false});
      }
    }
  }
}

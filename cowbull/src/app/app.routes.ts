import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
  {
    path : "",
    component: HomeComponent
  },
  {
    path : "lobby/:id",
    component: LobbyComponent
  },
  {
    path : "game",
    component: GameComponent
  }
];

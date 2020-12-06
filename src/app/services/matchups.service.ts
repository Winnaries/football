import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from './football.service';

const MATCHUP: Matchup = {
  _id: "1234",
  home: {
    logo: "https://media.api-sports.io/football/teams/496.png",
    name: "Juventus",
    players: [
      {
        _id: "A",
        sofifa_id: 20801,
        short_name: "Cristiano Ronaldo",
        long_name: "Cristiano Ronaldo dos Santos Aveiro",
        club_name: "Juventus",
        pace: 89,
        shooting: 93,
        passing: 81,
        dribbling: 89,
        defending: 35,
        physic: 77,
        gk_diving: 0,
        gk_handling: 0,
        gk_kicking: 0,
        gk_reflexes: 0,
        gk_speed: 0,
        gk_positioning: 0,
      }
    ]}, 
  away: {
    logo: "https://media.api-sports.io/football/teams/529.png",
    name: "Barcelona",
    players: [
      {
        _id: "B",
        sofifa_id: 158023,
        short_name: "L. Messi",
        long_name: "Lionel Andrés Messi Cuccittini",
        club_name: "Barcelona",
        pace: 85,
        shooting: 92,
        passing: 91,
        dribbling: 95,
        defending: 38,
        physic: 65,
        gk_diving: 0,
        gk_handling: 0,
        gk_kicking: 0,
        gk_reflexes: 0,
        gk_speed: 0,
        gk_positioning: 0,
      }
    ]},
  result: 'tie'
}

export interface Team {
  players: Player[];
  logo: string; 
  name: string; 
}

export interface Matchup {
  _id: string;
  home: Team;
  away: Team;
  result: 'win' | 'tie' | 'lose';
}

@Injectable({
  providedIn: 'root'
})
export class MatchupsService {

  constructor(private http: HttpClient) { }

  createMatchup(home: string[], away: string[]): Observable<Matchup> {
    return of(MATCHUP);
  }

  getMatchups(): Observable<Matchup[]> {
    return of([MATCHUP]);
  }

  getMatchupById(id: string): Observable<Matchup> {
    return of(MATCHUP);
  }

  deleteMatchup(id: string): boolean {
    return true;
  }

}

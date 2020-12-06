import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

export interface OutfieldAttributes {
  dribbling: number;
  pace: number;
  physic: number; 
  passing: number; 
  defending: number; 
  shooting: number; 
}

export interface GoalAttributes {
  gk_diving: number; 
  gk_handling: number; 
  gk_kicking: number; 
  gk_reflexes: number; 
  gk_speed: number; 
  gk_positioning: number;
}

export interface Player extends OutfieldAttributes, GoalAttributes {
  _id: string;
  club_name: string; 
  short_name: string; 
  long_name: string; 
  sofifa_id: number;
}

export interface Prediction {
  home: Player[];
  away: Player[];
  homeStat: OutfieldAttributes;
  awayStat: OutfieldAttributes;
  result: "home" | "tie" | "lose";
}

export interface SearchResponse {
  api: {
    results: number; 
    teams: {
      name: string; 
      logo: string; 
      team_id: number; 
    }[]
  };
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
  winner: 'home' | 'tie' | 'away';
}

export interface PredictionTeam {
  name: string; 
  gk: string[];
  players: string[];
}

export interface PredictionInput {
  home: PredictionTeam; 
  away: PredictionTeam;
}

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  public reserved: PredictionTeam;

  private footballUrl = "http://0c1fc893d4fa.ngrok.io";
  private searchUrl = "https://api-football-v1.p.rapidapi.com/v2/teams/search";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 
    })
  }

  searchHttpOptions = {
    headers: new HttpHeaders({
      "x-rapidapi-key": "b7d0ff22d1msh45a5853b2b60f12p16802cjsn9ac0f44fd204",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    })
  }

  constructor(private http: HttpClient) { }

  getDistinctClubs(): Observable<string[]> {
    const url = `${this.footballUrl}/clubs/distinct`;
    return this.http
      .get<{ clubs: string[] }>(url)
      .pipe(map(response => response.clubs));
  }

  getPlayersFromClub(name: string): Observable<Player[]> {
    const url = `${this.footballUrl}/clubs/${name}/players`;
    return this.http.get<{ players: Player[] }>(url).pipe(
      map(response => response.players)
    );
  }

  getClubLogoUrl(club: string): Observable<string> {
    if (club == "FC Barcelona") {
      club = "Barcelona";
    }

    club = club.replace(" ", "_");

    const url = `${this.searchUrl}/${club}`;
    return this.http.get<SearchResponse>(url, this.searchHttpOptions).pipe(
      map(response => response.api.teams),
      map(team => {
        if (!team[0]) {
          return "";
        }

        return team[0].logo
      })
    )
  }

  setReserved(name: string, gk: string[], players: string[]): void {
    this.reserved = {
      name, 
      gk, 
      players
    }
  }

  createMatchup(name: string, gk: string[], players: string[]): Observable<string> {
    const input = {
      home: this.reserved, 
      away: {
        name, 
        gk, 
        players
      }
    }

    this.reserved = undefined; 
    return this.http
      .post<{ _id: string }>(`${this.footballUrl}/matchups`, input, this.httpOptions)
      .pipe(map(response => response._id));
  }

  getMatchups(): Observable<Matchup[]> {
    const url = `${this.footballUrl}/matchups`;
    return this.http.get<{ matchups: Matchup[] }>(url).pipe(
      map((response) => response.matchups)
    )
  }

  getMatchupById(id: string): Observable<Matchup> {
    const url = `${this.footballUrl}/matchups/${id}`;
    return this.http.get<{ matchups: Matchup[] }>(url).pipe(
      map((response) => response.matchups[0])
    )
  }
}

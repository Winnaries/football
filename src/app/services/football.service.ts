import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'

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

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private footballUrl = "http://90bca632677a.ngrok.io";
  private portraitUrl = "https://cdn.sofifa.com/players/020/801/21_240.png"
  private searchUrl = "https://api-football-v1.p.rapidapi.com/v2/teams/search";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
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
    const url = `${this.footballUrl}/club/distinct`;
    return this.http.get<string[]>(url)
  }

  getPlayersFromClub(name: string): Observable<Player[]> {
    const url = `${this.footballUrl}/club/${name}/players`;
    return this.http.get<Player[]>(url);
  }

  getPhotoUrl(sofifaId: number): string {
    const id = sofifaId.toString();
    const l = id.slice(0, id.length - 3).padStart(3, '0');
    const r = id.slice(3);
    return `${this.portraitUrl}/players/${l}/${r}/21_240.png`
  }

  getClubLogoUrl(club: string): Observable<string> {
    const url = `${this.searchUrl}/${club}`;
    return this.http.get<SearchResponse>(url).pipe(
      map(response => response.api.teams),
      map(team => team[0].logo)
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { MatchupsService, Matchup } from '../../services/matchups.service';

@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.page.html',
  styleUrls: ['./matchups.page.scss'],
})
export class MatchupsPage implements OnInit {
  public matchups: Matchup[] = [];

  constructor(
    public matchupsService: MatchupsService, 
    public footballService: FootballService, 
  ) { }

  ngOnInit() {
    this.matchupsService
      .getMatchups()
      .subscribe(matchups => {
        this.matchups = matchups
      });
  }

}

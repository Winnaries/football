import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballService, Matchup } from '../../services/football.service';

@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.page.html',
  styleUrls: ['./matchups.page.scss'],
})
export class MatchupsPage implements OnInit {
  public matchups: Matchup[] = [];

  constructor(
    public service: FootballService, 
    public router: Router, 
    public route: ActivatedRoute, 
  ) { }

  ngOnInit() {
    this.service
      .getMatchups()
      .subscribe(matchups => {
        this.matchups = matchups
      });
  }

  navigateToCreate() {
    this.service.reserved = undefined;
    this.router.navigate(['create'], { relativeTo: this.route });
  }

}

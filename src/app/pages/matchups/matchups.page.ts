import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public router: Router, 
    public route: ActivatedRoute, 
  ) { }

  ngOnInit() {
    this.matchupsService
      .getMatchups()
      .subscribe(matchups => {
        this.matchups = matchups
      });
  }

  navigateToCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

}

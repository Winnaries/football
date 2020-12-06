import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballService, Matchup } from 'src/app/services/football.service';
import Chart from 'chart.js';

const LABEL = [
  'Defending', 
  'Dribbling', 
  'Pace', 
  'Passing', 
  'Physic', 
  'Shooting'
]

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public id: string;
  public matchup: Matchup; 
  public homeLogo: string; 
  public awayLogo: string; 

  constructor(
    public service: FootballService, 
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.service
        .getMatchupById(this.id)
        .subscribe((m) => {
          this.matchup = m;
          this.updateLogo();

          const ctx = (document.getElementById("radar") as any).getContext('2d')
          const _ = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: LABEL, 
                    datasets: [{
                        label: `${this.matchup.away.name}`,
                        data: LABEL.map((key) => this.matchup.away.of_stats[key.toLowerCase()]), 
                        borderColor: "rgba(255, 54, 112, 1)", 
                        backgroundColor: "rgba(255, 54, 112, 0.2)"
                    }, {
                        label: `${this.matchup.home.name}`,
                        data: LABEL.map((key) => this.matchup.home.of_stats[key.toLowerCase()]), 
                        borderColor: "rgba(0, 146, 238, 1)", 
                        backgroundColor: "rgba(0, 146, 238, 0.2)"
                    }]
                }, 
                options: {
                    maintainAspectRatio: true, 
                    aspectRatio: 1,
                    scale: {
                        ticks: {
                            suggestedMax: 100, 
                            suggestedMin: 0
                        }
                    }, 
                    legend: {
                      display: false
                  },
                }
            })
        })
    })
  }

  updateLogo() {
    this.service.getClubLogoUrl(this.matchup.home.name).subscribe((l) => this.homeLogo = l);
    this.service.getClubLogoUrl(this.matchup.away.name).subscribe((l) => this.awayLogo = l);
  }

  get winner() {
    if (this.matchup.winner === "tie") {
      return this.matchup.winner[0].toUpperCase() + this.matchup.winner.slice(1);
    } else {
      const name = this.matchup[this.matchup.winner].name;
      return name[0].toUpperCase() + name.slice(1);
    }
  }

}

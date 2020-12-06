import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
import { FootballService, Player } from '../../../services/football.service';
import { SelectorPage } from '../../modal/selector/selector.page';

export interface ModalData {
  data: {
    selection: string;
  }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public selectedClub: string = "Liverpool";
  public selectedPlayers: string[] = [];
  public selectedGK: string[] = [];
  public clubs: string[] = [];
  public logo: string = "";
  public players: Player[] = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: FootballService, 
    public modalController: ModalController, 
    public routerOutlet: IonRouterOutlet, 
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.updateLogo();
    this.updatePlayers();
    this.service
      .getDistinctClubs()
      .subscribe(clubs => this.clubs = clubs)
      .unsubscribe();
  }
  
  updateLogo() {
    this.service
      .getClubLogoUrl(this.selectedClub)
      .subscribe(logo => this.logo = logo)
  }

  updatePlayers() {
    this.service
      .getPlayersFromClub(this.selectedClub)
      .subscribe(players => this.players = players);
  }

  togglePlayer(id: string) {
    const index = this.selectedPlayers.indexOf(id);
    if (index >= 0) {
      this.selectedPlayers = [
        ...this.selectedPlayers.slice(0, index), 
        ...this.selectedPlayers.slice(index + 1),
      ]
    } else {
      this.selectedPlayers = [
        ...this.selectedPlayers, 
        id,
      ]
    }

    this.trySubmit();
  }

  toggleGK(id: string) {
    if (this.selectedGK[0] == id) {
      this.selectedGK = [];
    } else {
      this.selectedGK = [id];
      this.trySubmit();
    }
  }

  trySubmit() {
    if (this.selectedPlayers.length === 10 && this.selectedGK.length === 1) {
      if (this.service.reserved) {
        this.service.createMatchup(
          this.selectedClub, 
          this.selectedGK, 
          this.selectedPlayers
        ).subscribe((id: string)=> {
          this.router.navigateByUrl(`tabs/matchups/detail/${id}`)
        });
      } else {
        this.service.setReserved(
          this.selectedClub, 
          this.selectedGK, 
          this.selectedPlayers
        );

        this.selectedGK =[];
        this.selectedPlayers = [];
        this.selectedClub = "Manchester United";
        this.updatePlayers();
        this.updateLogo();
      }
    }
  }

  isSelected(id: string) {
    return this.selectedPlayers.includes(id) || this.selectedGK.includes(id);
  }

  async chooseTeam() {
    const modal = await this.modalController.create({
      component: SelectorPage, 
      swipeToClose: true, 
      showBackdrop: true, 
      presentingElement: this.routerOutlet.parentOutlet.nativeEl,
      componentProps: {
        list: this.clubs
      }
    })

    await modal.present();

    const { data } = await modal.onWillDismiss() as ModalData; 
    if (data.selection) {
      this.selectedClub = data.selection;
      this.selectedPlayers = [];
      this.updateLogo();
      this.updatePlayers();
    }
  }

  get outfieldPlayers() {
    return this.players.filter((player) => !player.gk_diving);
  }

  get goalkeeperPlayers() {
    return this.players.filter((player) => !!player.gk_diving);
  }

  get teamNumber() {
    return this.service.reserved ? "second" : "first";
  }

}
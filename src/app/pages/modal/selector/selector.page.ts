import Fuse from 'fuse.js';
import { Component, Input, OnInit } from '@angular/core';
import { FootballService } from '../../../services/football.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.page.html',
  styleUrls: ['./selector.page.scss'],
})
export class SelectorPage implements OnInit {
  private fuse: Fuse<string>; 
  private query: string = "";

  @Input() private list: string[];

  constructor(
    private service: FootballService, 
    private modalController: ModalController, 
  ) { }

  ngOnInit() {
    this.service
      .getDistinctClubs()
      .subscribe((clubs => { 
        this.list = clubs;
        this.fuse = new Fuse(this.list);
      }));
  }

  onSearch(e: string) {
    this.query = e; 
  }

  onSelect(e: string) {
    this.modalController.dismiss({
      selection: e,
    })
  }

  getFilteredList() {
    if (!this.query) {
      return this.list;
    } else if (this.fuse) {
      return this.fuse.search(this.query).map((item) => {
        return item.item;
      })
    }
  }

}

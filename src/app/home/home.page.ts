import { Component, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { getPositionFromBrowser, getPositionFromCapacitor } from '../services/geo-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [JsonPipe, IonCol, IonRow, IonGrid, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  webLocation: any = signal([]);
  capLocation: any = signal([]);

  constructor() {}

  ngOnInit() {
    this.getAccuracies();
  }

  async getAccuracies() {
    getPositionFromBrowser((loc: any) => this.webLocation.set(this.webLocation().concat(loc.accuracy.toFixed(2))));
    this.capLocation.set(this.capLocation().concat((await getPositionFromCapacitor()).accuracy.toFixed(2)));
  }
}

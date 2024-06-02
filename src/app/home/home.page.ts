import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import {
  getPositionFromBrowser,
} from '../services/geo-service';
import { initMap } from '../services/map-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class HomePage {
  webLocation: any = signal({});
  showLoading = false;

  constructor() {}

  async getLocation() {
    this.showLoading = true;
    this.webLocation.set({});
    getPositionFromBrowser((loc: any) => {
      this.webLocation.set(loc);
      initMap(loc.latitude, loc.longitude);
      this.showLoading = false;
    });
  }
}

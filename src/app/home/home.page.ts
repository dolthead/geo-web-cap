import { Component, OnInit, inject, signal } from '@angular/core';
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
  IonFooter,
  ToastController,
  ToastOptions,
} from '@ionic/angular/standalone';
import { getPositionFromBrowser } from '../services/geo-service';
import { initMap } from '../services/map-service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
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
export class HomePage implements OnInit {
  swUpdate: SwUpdate = inject(SwUpdate);
  private toastCtrl: ToastController = inject(ToastController);

  webLocation: any = signal({});
  showLoading = false;
  updateReady = false;

  constructor() {}

  async ngOnInit() {
    this.updateReady = await this.swUpdate.checkForUpdate();
    if (localStorage.getItem('appUpdated') === 'true') {
      this.doToast({ message: 'App updated' });
      localStorage.removeItem('appUpdated');
    }
  }

  doUpdate() {
    this.swUpdate.activateUpdate().then(
      (success: boolean) => {
        if (success) {
          localStorage.setItem('appUpdated', 'true');
          document.location.reload();
        }
      },
      (error: any) => this.doToast({ message: `Error updating app: ${error}` })
    );
  }

  async getLocation() {
    this.showLoading = true;
    this.webLocation.set({});
    getPositionFromBrowser((loc: any) => {
      this.webLocation.set(loc);
      initMap(loc.latitude, loc.longitude);
      this.showLoading = false;
    });
  }

  doToast(options: ToastOptions) {
    this.toastCtrl
      .create({
        message: 'The thing has been done!',
        duration: 5000,
        ...options,
      })
      .then((toast) => toast.present());
  }
}

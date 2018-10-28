import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import {LoadingController, NavController, ToastController} from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { AccountPage } from '../account/account';
import { SignupPage } from '../signup/signup';

import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController,
              public userData: UserData,
              public authService : AuthService,
              public toastController: ToastController,
              public loadingController: LoadingController,

  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      let loading = this.loadingController.create({ content: 'Ingresando' });
      loading.present();
      this.authService.loginWithEmail(this.login).then(data => {
        if (data == true) {
          this.authService.isLogged = true;
          loading.dismiss();
          setTimeout(() => { this.navCtrl.push(AccountPage); }, 2000);

        } else {
          loading.dismiss();
          setTimeout(() => {
            console.log(data);
            }, 2000);
        }
      }).catch(err => {
        loading.dismiss();
        setTimeout(() => {
          console.log(err);
        }, 2000);
      });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}

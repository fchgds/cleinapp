import {ToastController, LoadingController, AlertController} from 'ionic-angular';

export class MessageView{

  private static loader: any;

  constructor()
  {

  }

  public static showToast(toastController: ToastController, message: string)
  {
    let toast = toastController.create({
      message: message,
      duration: 4000,
      position: 'top'
    });

    toast.present();
  }

  public static showAlert(alertController: AlertController, message: string)
  {
    let alert = alertController.create({
      title: 'Mensaje',
      message: message,
      buttons: [{
        text: 'Aceptar',
        role: 'cancel',
      }]
    });

    alert.present();
  }

  public static showLoading(loadingController: LoadingController)
  {
    this.loader = loadingController.create({
      content: "Cargando",
    });

    this.loader.present();
  }

  public static hideLoading()
  {
    this.loader.dismiss();
  }


}

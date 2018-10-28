import {Headers, Response} from '@angular/http';
import {Observable} from "rxjs/Rx";

import {Config} from "./config";

export class baseService{

  public urlBaseAPI: string;
  public header: any;

  constructor(){
    this.urlBaseAPI = this.createUrlBaseApi();
    this.header = this.createHeaderType();
  }

  public handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server Error');
  }

  private createUrlBaseApi()
  {
    return Config.urlBaseAPI;
  }

  private createHeaderType()
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return {headers: headers};
  }

}

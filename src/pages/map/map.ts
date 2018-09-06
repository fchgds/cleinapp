import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';


declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform) {
  }

  ionViewDidLoad() {

      this.confData.getMap().subscribe((mapData: any) => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 14
        });

        mapData.forEach((markerData: any) => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<p>${markerData.name}</p>`
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            icon: "http://maps.google.com/mapfiles/kml/paddle/red-circle-lv.png",
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
            var link="https://www.google.com/maps/search/?api=1&query="+ markerData.lat +","+ markerData.lng;
            document.getElementById('map_canvas_description').innerHTML = "<p>" + markerData.name + "</p><a href='"+link+"'>Cómo Llegar</a>";
          });
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      });

  }
}

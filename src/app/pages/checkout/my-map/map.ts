import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/singup/auth.service';
import { User } from '../../models/user.model';

declare const L: any;
@Component({
  selector: 'app-google-maps',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})
export class MapComponent implements OnInit {
  constructor(private authService: AuthService) {}
  user:User;
  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    this.authService.user.subscribe(user => this.user = user);
    
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
    
      let mymap = L.map('map', { minZoom: 15, maxZoom: 15 }).setView(
        latLong,
        13
      );

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFya28wMzEiLCJhIjoiY2t6OXRrb29iMG13ZTJubzFic3E2aWV5cSJ9.AnN1pgCnr3nRhpOQ4c4EHQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      ).addTo(mymap);

      let marker = L.marker(latLong).addTo(mymap);

      marker.bindPopup('<b>Hi</b>').openPopup();

      let popup = L.popup()
        .setLatLng(latLong)
        .setContent(this.user.address)
        .openOn(mymap);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
})
export class FormationComponent implements OnInit {
  lausanneMarker: any;
  lavalMarker: any;
  oeilMarker: any;
  ecosphereMarker: any;

  scolarite: any[] = [
    {
      id: '1',
      titre: 'Université de Lausanne',
      icone: '../assets/lausanne.svg',
      diplome: [{ name: 'Bachelor en Biologie' }],
      download: '',
    },
    {
      id: '2',
      titre: 'Université Laval',
      icone: '../assets/ulaval.png',
      diplome: [
        { name: "Maitrise en Biogeoscience de l'environnement" },
        { name: 'Maîtrise en sciences géomatique' },
      ],
      download: '',
    },
  ];

  schoolToSee: any;
  popupContent =
    '<img style="width:50px;height:30px;" src="../assets/logo-unil_page-0001.jpg" /> <div>Université de Lausanne</div>';
  popupLavalContent =
    '<img style="width:60px;height:30px;" src="../assets/ulaval.png" /> <div>Université Laval</div>';
  ngOnInit(): void {
    this.schoolToSee = this.scolarite[0];

    const map = L.map('map').setView(
      [34.56887426616626, -40.75898081237563],
      2
    );
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
        minZoom: 2,
      }
    ).addTo(map);
    this.lausanneMarker = L.marker([46.52165055784521, 6.5802035153441105], {
      icon: L.icon({
        iconUrl: 'assets/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),
    })
      .addTo(map)
      .bindPopup(this.popupContent);
    this.lausanneMarker.id = '1';
    this.lausanneMarker.openPopup();
    this.lausanneMarker.on('click', () => {
      this.addSchoolToSee(this.lausanneMarker.id);
    });
    this.lavalMarker = L.marker([46.781954421446166, -71.27471398443716], {
      icon: L.icon({
        iconUrl: 'assets/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),
    })
      .addTo(map)
      .bindPopup(this.popupLavalContent);
    this.lavalMarker.id = '2';
    this.lavalMarker.on('click', () => {
      this.addSchoolToSee(this.lavalMarker.id);
    });
  }

  addSchoolToSee(marker: any) {
    console.log(marker);
    if (marker === '1') {
      this.schoolToSee = this.scolarite[0];
    } else {
      this.schoolToSee = this.scolarite[1];
    }
  }
}

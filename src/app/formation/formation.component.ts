import { HttpClient } from '@angular/common/http';
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
        { name: "Maîtrise en Biogeosciences de l'environnement" },
        { name: 'Maîtrise en sciences géomatique - géomatique appliquée' },
      ],
      download: '',
    },
  ];

  schoolToSee: any;
  popupContent =
    '<img style="width:50px;height:30px;" src="../assets/logo-unil_page-0001.jpg" /> <div>Université de Lausanne</div>';
  popupLavalContent =
    '<img style="width:60px;height:30px;" src="../assets/ulaval.png" /> <div>Université Laval</div>';
  pdfUrl!: string;
  constructor(private http: HttpClient) {}
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

  // Fonction pour télécharger le fichier PDF
  downloadPdf(id: string) {
    // Spécifiez l'URL du fichier PDF à télécharger
    if (id === '1') {
      this.pdfUrl = 'assets/bachelor_suisse.pdf';
    } else {
      this.pdfUrl = 'assets/maitrise_biogeo.pdf';
    }

    // Utilisez HttpClient pour télécharger le fichier
    this.http
      .get(this.pdfUrl, { responseType: 'arraybuffer' })
      .subscribe((data: ArrayBuffer) => {
        // Créez un blob à partir des données
        const blob = new Blob([data], { type: 'application/pdf' });

        // Créez un objet URL pour le blob
        const url = window.URL.createObjectURL(blob);

        // Créez un lien invisible dans le DOM
        const a = document.createElement('a');
        a.href = url;

        if (id === '1') {
          a.download = 'bachelor_suisse_CDC.pdf';
        } else {
          a.download = 'maitrises_CDC.pdf';
        }

        // Ajoutez le lien au DOM et déclenchez le téléchargement
        document.body.appendChild(a);
        a.click();

        // Libérez l'objet URL et supprimez le lien du DOM
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  }
}

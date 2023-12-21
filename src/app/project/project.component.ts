import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/productfolder';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  images: any;
  responsiveOptions: any;

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.images = [
      {
        random: 'CarHab',
        picture: '../assets/carhab.png',
        description:
          'CarHab est un programme national de modélisation cartographique des habitats naturels et semi-naturels de France',
        site: 'https://www.patrinat.fr/fr/cartographie-nationale-des-habitats-carhab-6671',
      },
      {
        random: 'EcoMap',
        picture: '../assets/ecomap1.png',
        description:
          "EcoMap est un projet de visualisation et d'analyse de données environnementales.",
      },
      {
        random: 'Carto-Bruit',
        picture: '../assets/carte-bruit.png',
        description:
          'Carto-Bruit est une application web de diffusion et visualisation 2D et 3D de données acoustiques.',
      },
    ];
  }
}
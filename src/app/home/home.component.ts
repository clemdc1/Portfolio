import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cvPdf: string = '';

  constructor(private http: HttpClient) {}
  ngOnInit() {}

  downloadCV() {
    // Spécifiez l'URL du fichier PDF à télécharger
    this.cvPdf = 'assets/CV_CDC.pdf';

    // Utilisez HttpClient pour télécharger le fichier
    this.http
      .get(this.cvPdf, { responseType: 'arraybuffer' })
      .subscribe((data: ArrayBuffer) => {
        // Créez un blob à partir des données
        const blob = new Blob([data], { type: 'application/pdf' });

        // Créez un objet URL pour le blob
        const url = window.URL.createObjectURL(blob);

        // Créez un lien invisible dans le DOM
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV_CDC.pdf';

        // Ajoutez le lien au DOM et déclenchez le téléchargement
        document.body.appendChild(a);
        a.click();

        // Libérez l'objet URL et supprimez le lien du DOM
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  }
}

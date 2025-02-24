import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="album">
      <h2>{{ album.title }}</h2>
      <a [routerLink]="['/albums', album.id, 'photos']">View Photos</a>
      <a [routerLink]="['/albums']">Back to Albums</a>
    </div>
  `,
  styles: [`
    div {
      padding: 1rem;
    }
    a {
      margin-right: 1rem;
    }
  `]
})
export class AlbumDetailComponent implements OnInit {
  album: any;

  constructor(
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.albumsService.getAlbum(id).subscribe(
        album => this.album = album
      );
    });
  }
}

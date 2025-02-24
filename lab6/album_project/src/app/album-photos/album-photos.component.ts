import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="photos-container">
      <h2>Album Photos</h2>
      <a [routerLink]="['/albums', albumId]">Back to Album</a>
      <div class="photos-grid">
        <div *ngFor="let photo of photos" class="photo-card">
          <img [src]="photo.thumbnailUrl" [alt]="photo.title">
          <p>{{ photo.title }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .photos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
    .photo-card {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    img {
      width: 100%;
      height: auto;
    }
  `]
})
export class AlbumPhotosComponent implements OnInit {
  photos: any[] = [];
  albumId!: number;

  constructor(
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.albumId = +params['id'];
      this.albumsService.getPhotosByAlbum(this.albumId).subscribe(
        photos => this.photos = photos
      );
    });
  }
}

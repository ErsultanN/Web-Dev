import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AlbumService } from './album.service';
import { Album } from './album.interface';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="albums-container">
      <h2>Albums</h2>
      <div *ngIf="loading" class="loading">Loading albums...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="!loading && !error" class="albums-list">
        <div *ngFor="let album of albums" class="album-item">
          <div class="album-title" (click)="onAlbumClick(album.id)">
            {{ album.title }}
          </div>
          <button class="delete-btn" (click)="deleteAlbum(album.id)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .albums-container {
      padding: 20px;
    }
    .loading, .error {
      padding: 20px;
      text-align: center;
    }
    .error {
      color: red;
    }
    .albums-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .album-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .album-title {
      cursor: pointer;
    }
    .album-title:hover {
      color: #0066cc;
    }
    .delete-btn {
      background-color: #ff4444;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .delete-btn:hover {
      background-color: #cc0000;
    }
  `]
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private albumService: AlbumService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAlbums();
  }

  loadAlbums() {
    this.loading = true;
    this.error = null;
    
    this.albumService.getAlbums().subscribe({
      next: (albums) => {
        console.log('Albums loaded:', albums);
        this.albums = albums;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading albums:', error);
        this.error = 'Failed to load albums. Please try again later.';
        this.loading = false;
      }
    });
  }

  deleteAlbum(id: number) {
    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums = this.albums.filter(album => album.id !== id);
      },
      error: (error) => {
        console.error('Error deleting album:', error);
        alert('Failed to delete album. Please try again.');
      }
    });
  }

  onAlbumClick(id: number) {
    this.router.navigate(['/albums', id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlbumService } from '../album.service';
import { Photo } from '../photo.interface';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="photos-container">
      <div class="header">
        <button class="return-btn" (click)="goBack()">Return</button>
        <h2>Album Photos</h2>
      </div>

      <div *ngIf="loading" class="loading">Loading photos...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      
      <div *ngIf="!loading && !error" class="photos-grid">
        <div *ngFor="let photo of photos" class="photo-card">
          <div class="number-container" [style.background-color]="getRandomColor()">
            <span class="photo-number">{{photo.id}}</span>
          </div>
          <p class="photo-title">{{photo.title}}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .photos-container {
      padding: 20px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    .return-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #3498db;
      color: white;
      transition: background-color 0.3s;
    }
    .return-btn:hover {
      background-color: #2980b9;
    }
    .loading, .error {
      padding: 20px;
      text-align: center;
    }
    .error {
      color: #e74c3c;
    }
    .photos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }
    .photo-card {
      border-radius: 8px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .photo-card:hover {
      transform: translateY(-5px);
    }
    .number-container {
      position: relative;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .photo-number {
      font-size: 48px;
      font-weight: bold;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .photo-title {
      padding: 15px;
      margin: 0;
      font-size: 14px;
      color: #2c3e50;
      text-align: center;
      border-top: 1px solid #eee;
      background: white;
    }
  `]
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {}

  ngOnInit() {
    this.loading = true;
    const albumId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.albumService.getAlbumPhotos(albumId).subscribe({
      next: (photos) => {
        this.photos = photos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading photos:', error);
        this.error = 'Failed to load photos. Please try again later.';
        this.loading = false;
      }
    });
  }

  getRandomColor(): string {
    const colors = [
      '#3498db', '#e74c3c', '#2ecc71', '#f1c40f', 
      '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  goBack() {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['/albums', albumId]);
  }
} 
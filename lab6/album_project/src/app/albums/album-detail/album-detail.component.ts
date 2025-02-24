import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album.interface';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="album-detail" *ngIf="album">
      <div class="navigation-buttons">
        <button class="return-btn" (click)="goBack()">Return</button>
        <a class="photos-link" [routerLink]="['/albums', album.id, 'photos']">Photos</a>
      </div>

      <h2>Album Details</h2>
      <div class="detail-card">
        <p><strong>ID:</strong> {{album.id}}</p>
        <p><strong>User ID:</strong> {{album.userId}}</p>
        
        <div class="edit-title">
          <label for="titleInput"><strong>Title:</strong></label>
          <input 
            id="titleInput"
            type="text" 
            [(ngModel)]="editableTitle" 
            class="title-input"
          >
          <button 
            class="save-btn" 
            (click)="saveTitle()" 
            [disabled]="editableTitle === album.title"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .album-detail {
      padding: 20px;
    }
    .navigation-buttons {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .return-btn, .save-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #4CAF50;
      color: white;
    }
    .return-btn:hover, .save-btn:hover {
      background-color: #45a049;
    }
    .save-btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .photos-link {
      padding: 8px 16px;
      background-color: #2196F3;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
    .photos-link:hover {
      background-color: #1976D2;
    }
    .detail-card {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      max-width: 600px;
      margin: 0 auto;
    }
    .edit-title {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-top: 10px;
    }
    .title-input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  editableTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.albumService.getAlbumById(id).subscribe(album => {
      this.album = album;
      this.editableTitle = album.title;
    });
  }

  saveTitle() {
    if (this.album && this.editableTitle !== this.album.title) {
      const updatedAlbum: Album = {
        ...this.album,
        title: this.editableTitle
      };
      
      this.albumService.updateAlbum(updatedAlbum).subscribe(
        response => {
          this.album = response;
          alert('Album title updated successfully!');
        },
        error => {
          alert('Error updating album title');
          console.error('Error:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/albums']);
  }
} 
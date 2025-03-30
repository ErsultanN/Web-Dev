import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'spacex-launches' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('spacex-launches');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, spacex-launches');
  });
});

import { ComponentFixture, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  @Component({
    selector: 'app-spacex-launches',
    template: '/spacex-launches.component.html',
    styleUrls: ['/spacex-launches.component.css'],
  })
  class MockAppComponent {}
  
  export class SpacexLaunchesComponent implements OnInit {

    launches: any[] = [];
    filteredLaunches: any[] = [];
    apiUrl = 'https://api.spacexdata.com/v5/launches';

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
      this.http.get('https://api.spacexdata.com/v3/launches').subscribe((data) => {
        this.launches = data;
        this.filteredLaunches = data;
    
      });

      filterSuccessful(): void {
        this.filteredLaunches = this.launches.filter((launch: any) => launch.success);
        }   
      }
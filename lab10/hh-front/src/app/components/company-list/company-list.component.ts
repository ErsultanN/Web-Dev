import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  loading = false;
  error: string | null = null;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.loading = true;
    this.companyService.getCompanies()
      .subscribe({
        next: (companies) => {
          this.companies = companies;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load companies';
          this.loading = false;
          console.error('Error fetching companies:', error);
        }
      });
  }
}
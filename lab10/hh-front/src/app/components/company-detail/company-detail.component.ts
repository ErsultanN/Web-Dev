import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../models/company';
import { Vacancy } from '../../models/vacancy';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company: Company | null = null;
  vacancies: Vacancy[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.companyService.getCompany(id).subscribe({
      next: (company) => {
        this.company = company;
        this.getCompanyVacancies(id);
      },
      error: (error) => {
        this.error = 'Failed to load company details';
        this.loading = false;
        console.error('Error fetching company:', error);
      }
    });
  }

  getCompanyVacancies(id: number): void {
    this.companyService.getCompanyVacancies(id).subscribe({
      next: (vacancies) => {
        this.vacancies = vacancies;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load company vacancies';
        this.loading = false;
        console.error('Error fetching vacancies:', error);
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { dt } from '@primeuix/styled';
import { InputText } from 'primeng/inputtext';
import { Panel } from 'primeng/panel';
import { Tag } from 'primeng/tag';
import { Badge } from 'primeng/badge';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { AlertService } from '../../../Service/Alert.service';
import { Alert } from '../../../Models/Alert.model';
import { SplitButton } from 'primeng/splitbutton';
import { ReportService } from '../../../Service/ReportService';

@Component({
  selector: 'app-alert-table',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    CurrencyPipe,
    NgIf,
    NgClass,
    NgForOf,
    Dialog,
    DropdownModule,
    TableModule,
    InputText,
    Panel,
    Tag,
    Badge,
    Button,
    Toolbar,
    SplitButton
  ],
  templateUrl: './alert-table.component.html',
  styleUrl: './alert-table.component.scss'
})
export class AlertTableComponent implements OnInit{
  suspects: Alert[] = [];
  filteredSuspects: Alert[] = [];
  selectedSuspect: Alert | null = null;
  defaultAction = 'Block';

  allSuspects: Alert[] = [];

  // UI state
  loading = false;

  // Filters
  customerNameFilter = '';

  // Pagination
  // Filter variables
  accountNoFilter: string = '';
  customerIdFilter: string = '';
  transactionIdFilter: string = '';
  ruleNameFilter: string = '';
  actionMessageFilter: string = '';
  display = false;
  // Sorting
  sortColumn: string = 'suspectId';
  sortDirection: 'asc' | 'desc' = 'desc';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  globalFilter = '';

  priorityFilter: string = '';
  first = 0;

  ruleNames: string[] = [];
  priorityOptions = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ];
  constructor(private alertService:AlertService,private reportService:ReportService) { }

  ngOnInit(): void {
    this.loadSuspects();
  }

  loadSuspects(): void {
    this.alertService.getAllAlerts().subscribe({
      next: (data) => {
        this.suspects = data;
        this.filteredSuspects = [...this.suspects];
        this.ruleNames = [...new Set(this.suspects.map(s => s.rule?.rule_name).filter(Boolean))];

      },
      error: (err) => {
        console.error('Error loading suspects:', err);
      }
    });
  }

  applyFilters(): void {
    let results = [...this.suspects];

    // Apply individual filters
    if (this.accountNoFilter) {
      results = results.filter(s =>
        s.account?.account_no?.toString().includes(this.accountNoFilter));
    }

    if (this.customerIdFilter) {
      results = results.filter(s =>
        s.account?.customer.id?.toString().includes(this.customerIdFilter));
    }

    if (this.transactionIdFilter) {
      results = results.filter(s =>
        s.transaction?.transaction_no?.toString().includes(this.transactionIdFilter));
    }

    if (this.ruleNameFilter) {
      results = results.filter(s =>
        s.rule?.rule_name === this.ruleNameFilter);
    }

    if (this.actionMessageFilter) {
      results = results.filter(s =>
        s.actionMassage === this.actionMessageFilter);
    }

    // Apply global filter
    if (this.globalFilter) {
      const searchTerm = this.globalFilter.toLowerCase();
      results = results.filter(s =>
        JSON.stringify(s).toLowerCase().includes(searchTerm));
    }

    // Apply sorting
    results.sort((a, b) => {
      const aValue = this.getNestedValue(a, this.sortColumn);
      const bValue = this.getNestedValue(b, this.sortColumn);

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredSuspects = results;
    this.updatePagination();
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => o && o[p], obj);
  }

  applyFilter(column: string, value: string): void {
    this.currentPage = 1;
    this.applyFilters();
  }



  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredSuspects.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }

  takeAction(action: string): void {
    if (!this.selectedSuspect) return;

    switch(action) {
      case 'Fraudulent':
        this.selectedSuspect.takenAction = 'Fraudulent';
        break;
      case 'Legitimate':
        this.selectedSuspect.takenAction = 'Legitimate';
        break;
    }
    this.alertService.updateAlert(this.selectedSuspect).subscribe({

      next: () => {
        this.loadSuspects();
        this.display = false;
      },
      error: (err) => console.error('Error updating suspect:', err)
    });
  }

  refreshData(): void {
    this.currentPage = 1;
    this.resetFilters();
    this.loadSuspects();
  }

  resetFilters(): void {
    this.globalFilter = '';
    this.accountNoFilter = '';
    this.customerIdFilter = '';
    this.transactionIdFilter = '';
    this.ruleNameFilter = '';
    this.actionMessageFilter = '';
    this.sortColumn = 'suspectId';
    this.sortDirection = 'desc';
  }

  showSuspectDetails(suspect: any) {
    this.selectedSuspect = suspect;
    this.display = true;
  }

  protected readonly dt = dt;

  getAlertAgeSeverity(suspectAge: number): 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' {
    if (suspectAge >7) {
      return 'danger';
    } else if (suspectAge <=7 && suspectAge >2) {
      return 'warn';
    } else if (suspectAge <2) {
      return 'info';
    } else {
      return 'success';
    }
  }


  getPrioritySeverity(priority: string): 'success' | 'info' | 'warn' | 'danger' | undefined {

    if (!priority) return 'info';

    const p = priority.toString().toLowerCase().trim(); // Handle different types and whitespace

    switch (p) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warn';
      case 'low':
        return 'success';
      default:
        console.log('No match found for:', JSON.stringify(p));
        return 'info';
    }
  }
  getPriorityIcon(priority: string): string {
    if (!priority) return 'pi pi-info-circle';

    const p = priority.toString().toLowerCase().trim();

    switch (p) {
      case 'high':
        return 'pi pi-exclamation-triangle';
      case 'medium':
        return 'pi pi-exclamation-circle';
      case 'low':
        return 'pi pi-check-circle';
      default:
        return 'pi pi-info-circle';

  }
  }


  actionItems = [
    {
      label: 'Fraudulent',
      icon: 'pi pi-ban',
      command: () => this.takeAction('Fraudulent')
    },

    {
      label: 'Legitimate',
      icon: 'pi pi-check-circle',
      command: () => this.takeAction('Legitimate')
    }
  ];

  exportReport() {
    console.log(this.filteredSuspects)
    this.reportService.generateReport(this.filteredSuspects).subscribe((res)=>{
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(res);
      a.href = objectUrl;
      a.download = 'alerts-report.pdf';
      a.click();
      URL.revokeObjectURL(objectUrl);
    })
  }
}

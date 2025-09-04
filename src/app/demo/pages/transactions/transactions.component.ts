import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { Transaction } from '../../../Models/Transaction.model';
import { TransactionService } from '../../../Service/Transaction.service';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe, NgIf, PercentPipe } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { PredicationService } from '../../../Service/PredicationService';
import { PredictionDTO } from '../../../DTO/PredictionDTO';
import { Tag } from 'primeng/tag';
import { Card } from 'primeng/card';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-transactions',
  standalone: true,
  providers: [MessageService],
  imports: [
    PrimeTemplate,
    TableModule,
    DatePipe,
    CurrencyPipe,
    ButtonDirective,
    Tag,
    PercentPipe,
    Card,
    NgIf,
    ProgressSpinner,
    Toast
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit  {
  transactions: Transaction[] = [];
  selectedTransactions: Transaction[] = [];
  response:PredictionDTO[];
  showPredictions = false;
  predictionMap: { [key: number]: PredictionDTO } = {};

  loading: boolean = false;
  constructor(private transactionService: TransactionService,private predicationService:PredicationService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => this.transactions = data,
      error: (err) => console.error(err)
    });
  }

  getPrediction() {

    const selectedIds = this.selectedTransactions.map(t => t.transaction_no);

    if (selectedIds.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Selection',
        detail: 'Please select at least one transaction to get prediction.'
      });

      return;
    }
    this.loading = true;
    this.predicationService.getPredication(selectedIds).subscribe({
      next: (res: PredictionDTO[]) => {
        this.response = res;

        this.predictionMap = {};
        res.forEach(p => {
          this.predictionMap[p.transaction_id] = p;
        });
        this.loading = false;

      }

    });

    this.showPredictions = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../../../Models/Transaction.model';
import { TransactionService } from '../../../Service/Transaction.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { Device } from '../../../Models/Device.model';
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../../Models/Account.model';
import { AccountService } from '../../../Service/Account.service';

@Component({
  selector: 'app-transfer-money',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    CurrencyPipe,
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './transfer-money.component.html',
  styleUrl: './transfer-money.component.scss'
})
export class TransferMoneyComponent implements OnInit{
  transferForm: FormGroup;
  isProcessing = false;
  showPreview = false;
  showSuccessModal = false;
  transactionResponse: Transaction | null = null;
  userAccounts:Account[];
  // Configuration
  currencyCode = 'USD';
  currencySymbol = '$';
  minTransferAmount = 1;
  maxTransferAmount = 250000;
  transferFee = 0.50; // Example fixed fee

  // Device and location info
  currentLocation = 'Detecting...';
  deviceInfo: Device = {
    device_id: 0,
    type: 'Unknown',
    ipAddress: '0.0.0.0'
  };

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private route:ActivatedRoute,
    private accountService:AccountService
  ) {
    this.transferForm = this.fb.group({
      accountFrom:['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      accountTo: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      amount: ['', [Validators.required, Validators.min(this.minTransferAmount), Validators.max(this.maxTransferAmount)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.accountService.getAccountsByUser().subscribe(accounts => {
      this.userAccounts = accounts;
    })
    this.detectLocation();
    this.detectDevice();
  }

  detectLocation(): void {
    fetch('https://ipapi.co/json/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        return response.json();
      })
      .then(data => {
        // Access the location details
        this.currentLocation = `${data.city}, ${data.country_name}`;

        // ✅ Update only IP, keep the detected device type
        this.deviceInfo = {
          ...this.deviceInfo, // keep device type set in detectDevice()
          ipAddress: data.ip,
          device_id: 0
        };
      })
      .catch(error => {
        console.error('Location detection error:', error);
        this.currentLocation = 'Location not available';
      });
  }

  detectDevice(): void {
    const userAgent = navigator.userAgent;
    let deviceType = 'Desktop';

    if (/Mobi|Android|iPhone|iPod/i.test(userAgent)) {
      deviceType = 'Mobile';
    } else if (/Tablet|iPad/i.test(userAgent)) {
      deviceType = 'Tablet';
    }

    this.deviceInfo = {
      ...this.deviceInfo, // keep IP when detectLocation runs later
      device_id: null,
      type: deviceType,
      ipAddress: this.deviceInfo.ipAddress || '0.0.0.0'
    };
  }


  onSubmit(): void {
    if (this.transferForm.valid) {
      this.showPreview = true;
    }
  }

  confirmTransfer(): void {
    this.isProcessing = true;

    const transactionData: Transaction = {
      transaction_no: 0, // Will be assigned by server
      type: 'transfer',
      date: new Date(),
      amount: this.transferForm.value.amount,
      status: 'accepted',
      location: this.currentLocation,
      // location:"Palestine",
      device: this.deviceInfo,
      accountFrom:new Account(),
      accountTo:new Account(),
    };
    transactionData.accountFrom.account_no = this.transferForm.value.accountFrom;

    transactionData.accountTo.account_no = this.transferForm.value.accountTo;
    console.log(transactionData);
    this.transactionService.makeTransaction(transactionData)
      .pipe(
        tap(response => {
          this.transactionResponse = response;
          this.showSuccessModal = true;
          this.showPreview = false;
        }),
        catchError(error => {
          console.error('Transfer error:', error);
          // Handle error (show error message, etc.)
          return of(null);
        }),
        finalize(() => {
          this.isProcessing = false;
        })
      )
      .subscribe();
    console.log(this.transferForm);
    console.log(transactionData);
  }

  cancel(): void {
    // Reset form or navigate away
    this.transferForm.reset();
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.transferForm.reset();
  }
}

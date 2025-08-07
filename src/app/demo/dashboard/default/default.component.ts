// Angular Import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { CustomerService } from '../../../Service/Customer.service';
import { Customer } from '../../../Models/Customer.model';
import { AccountService } from '../../../Service/Account.service';
import { DashboardService } from '../../../Service/Dashboard.service';
import { Dashboard } from '../../../DTO/Dashboard';
import { AmountFrequencyChartComponent } from '../../../Charts/amount-frequency-chart/amount-frequency-chart.component';
import { BarchartComponent } from '../../../Charts/barchart/barchart.component';
import { SuspectsPerDayCharComponent } from '../../../Charts/suspects-per-day-char/suspects-per-day-char.component';
import { AccountSuspectChartComponent } from '../../../Charts/account-suspect-chart/account-suspect-chart.component';

@Component({
  selector: 'app-default',
  imports: [BarChartComponent, SharedModule, AmountFrequencyChartComponent, BarchartComponent, SuspectsPerDayCharComponent, AccountSuspectChartComponent],
  templateUrl: './default.component.html',
  standalone: true,
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
   myDashboard: Dashboard;
  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.myDashboard = data;
        console.log("data" ,data);
      }
    })
  }
}

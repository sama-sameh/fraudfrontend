import { Component, Input } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-account-suspect-chart',
  standalone: true,
  imports: [
    NgChartsModule
  ],
  templateUrl: './account-suspect-chart.component.html',
  styleUrl: './account-suspect-chart.component.scss'
})
export class AccountSuspectChartComponent {
  @Input() alertAndAccounts:Map<string,number>;
  public barChartData:ChartConfiguration<'bar'>['data'];
  public barChartOptions:ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Number of Alerts per Account'
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function(value) {
            return Number.isInteger(+value) ? value : '';
          },
          stepSize: 1
        }
      }
    }
  };

  ngOnInit(): void {
    const object = this.alertAndAccounts as unknown as { [key: string]: number };
    const map = new Map<string, number>(Object.entries(object));
    const sortedEntries = Array.from(map.entries())
      .sort((a, b) => b[1] - a[1]);

    const ruleNames = sortedEntries.map(entry => entry[0]);
    const alertCounts = sortedEntries.map(entry => entry[1]);
    this.barChartData = {
      labels: ruleNames,
      datasets: [
        {
          data: alertCounts,
          label: 'Alerts',
          backgroundColor: '#42A5F5',
          hoverBackgroundColor: '#1E88E5'
        }
      ]
    };
  }

}

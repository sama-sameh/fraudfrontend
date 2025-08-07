import { Component, Input, OnInit } from '@angular/core';
import {
  Chart as ChartJS,
  ScatterController,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title, ChartConfiguration, ChartOptions
} from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

ChartJS.register(
  ScatterController,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title
);
@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [ NgChartsModule],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.scss'
})
export class BarchartComponent implements OnInit{
  @Input() alertAndRules:Map<string,number>;
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
        text: 'Number of Alerts per Rule'
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
    const object = this.alertAndRules as unknown as { [key: string]: number };
    const map = new Map<string, number>(Object.entries(object));

    const ruleNames = Array.from(map.keys());
    const alertCounts = Array.from(map.values());
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

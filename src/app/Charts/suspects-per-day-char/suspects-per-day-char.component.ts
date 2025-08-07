import { Component, Input } from '@angular/core';
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
import { SuspectCountPerDayDTO } from '../../DTO/SuspectCountPerDayDTO';

ChartJS.register(
  ScatterController,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title
);
@Component({
  selector: 'app-suspects-per-day-char',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './suspects-per-day-char.component.html',
  styleUrl: './suspects-per-day-char.component.scss'
})
export class SuspectsPerDayCharComponent {
    @Input() suspectsPerDay:SuspectCountPerDayDTO[];
  public lineChartData: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Number of Suspects per Day'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };
  ngOnInit(): void {
    const labels = this.suspectsPerDay.map(entry => entry.date);
    const data = this.suspectsPerDay.map(entry => entry.count);

    this.lineChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Suspects',
          borderColor: '#42A5F5',
          backgroundColor: '#90CAF9',
          fill: false,
          tension: 0.3
        }
      ]
    };
  }
}

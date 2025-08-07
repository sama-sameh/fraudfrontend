import { Component, Input, OnInit } from '@angular/core';
import { TransactionScatterDTO } from '../../DTO/TransactionScatterDTO';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import {
  Chart as ChartJS,
  ScatterController,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  ScatterController,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title
);


@Component({
  selector: 'app-amount-frequency-chart',
  standalone: true,
  imports: [
    NgChartsModule
  ],
  templateUrl: './amount-frequency-chart.component.html',
  styleUrl: './amount-frequency-chart.component.scss'
})
export class AmountFrequencyChartComponent implements OnInit{
  @Input() transactions: TransactionScatterDTO[] = [];
  public scatterChartType:ChartType="scatter";
  public scatterChartData:ChartConfiguration<'scatter'>['data'] ={
    datasets:[]
  };
  public scatterChartOptions:ChartConfiguration<'scatter'>['options'] ={
    responsive: true,
    scales:{
      x:{
        type: 'linear',
        title:{display:true,text:'Amount'}
      },
      y:{
        type: 'linear',
        title:{display:true,text:'Frequency'}
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const { x, y } = context.raw as any;
            return `Amount: ${x}, Frequency: ${y}`;
          }
        }
      }
    }
  };

  ngOnInit(): void {
    const fraudPoints = this.transactions
      .filter(tx => tx.fraud === true )
      .map(tx=>({x:tx.amount,y:tx.frequency}))
    const legitPoints  = this.transactions
      .filter(tx => !tx.fraud)
      .map(tx=>({x:tx.amount,y:tx.frequency}))
    this.scatterChartData.datasets = [
      {
        label:'Fraudulent',
        data:fraudPoints,
        backgroundColor: 'rgba(244, 67, 54, 0.8)',
        pointRadius: 5
      },
      {
        label:'Legitimate',
        data:legitPoints,
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
        pointRadius: 5
      }
    ]

  }


}

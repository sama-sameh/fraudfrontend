import { Component } from '@angular/core';
import { TableComponent } from '../table/table';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

}

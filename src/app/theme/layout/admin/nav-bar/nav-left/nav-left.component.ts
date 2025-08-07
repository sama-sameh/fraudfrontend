// Angular import
import { Component, Output, EventEmitter } from '@angular/core';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  standalone: true,
  imports: [
    NgbDropdownToggle,
    NgbDropdown,
    NgbDropdownMenu
  ],
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent {
  // public props
  @Output() NavCollapsedMob = new EventEmitter();
}

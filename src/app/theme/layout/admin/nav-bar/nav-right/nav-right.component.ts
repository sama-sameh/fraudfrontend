// Angular import
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from '../../../../../Authentication/auth.service';

@Component({
  selector: 'app-nav-right',
  imports: [RouterModule, SharedModule],
  templateUrl: './nav-right.component.html',
  standalone: true,
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  constructor(private authService: AuthService, router: Router) {
  }
  logout() {
    this.authService.logout();
  }
}

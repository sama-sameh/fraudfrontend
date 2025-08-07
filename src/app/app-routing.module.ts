import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { Form } from './demo/pages/form/form';
import { ConditionformComponent } from './demo/pages/conditionform/conditionform.component';
import { TransferMoneyComponent } from './demo/pages/transfer-money/transfer-money.component';
import { LoginComponent } from './demo/pages/login/login.component';
import { AlertTableComponent } from './demo/pages/alert-table/alert-table.component';
import { RulesComponent } from './demo/pages/rules/rules.component';
import { publicGuard } from './Authentication/public.guard';
import { RoleGuard } from './Authentication/role.guard';
import { CustomersComponent } from './demo/pages/customers/customers.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent),
        canActivate: [publicGuard,RoleGuard],data:{role:'ADMIN'}
      },

      {
        path: 'form/:entity',component:Form,canActivate: [publicGuard,RoleGuard],data:{role:'ADMIN'}
      },
      {
        path: 'customers',component:CustomersComponent,canActivate: [publicGuard,RoleGuard],data:{role:'ADMIN'}
      },
      {
        path: 'addCondition/:ruleId',component:ConditionformComponent,canActivate: [publicGuard,RoleGuard],data:{role:'ADMIN'}
      },

      {
        path: 'alerts',component:AlertTableComponent,canActivate: [publicGuard,RoleGuard],data:{role:'ADMIN'}
      },
      {
        path: 'rules',component:RulesComponent,canActivate: [publicGuard,RoleGuard],data:{role:'ADMIN'}
      }

    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'transfer',component:TransferMoneyComponent,canActivate: [publicGuard,RoleGuard],data:{role:'USER'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

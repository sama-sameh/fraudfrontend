import { Component } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { RuleService } from '../../../Service/Rule.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ConditionformComponent } from '../conditionform/conditionform.component';
import { Tooltip } from 'primeng/tooltip';
import { ConditionService } from '../../../Service/Condition.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TransactionService } from '../../../Service/Transaction.service';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [
    TreeTableModule,
    NgClass,
    NgIf,
    NgForOf,
    ButtonDirective,
    Dialog,
    DialogComponent,
    ConditionformComponent,
    Tooltip,
    ConfirmDialog
  ],
  providers:[ConfirmationService],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent {
  files!: TreeNode[];
  displayConditionDialog = false;
  selectedRule: number = null;
  newCondition = '';
  displayAddRuleDialog = false;
  displayAddConditionDialog = false;

  constructor(private ruleService: RuleService, private router: Router, private conditionService: ConditionService, private confirmationService: ConfirmationService,private transactionService:TransactionService) {
  }

  ngOnInit() {
    this.loadData();
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Published':
        return 'pi pi-check-circle';
      case 'Inactive':
        return 'pi pi-ban';
      case 'Draft':
        return 'pi pi-pencil';
      case 'Archived':
        return 'pi pi-archive';
      default:
        return 'pi pi-info-circle';
    }
  }

  loadData() {
    this.ruleService.getRuleTreeTableNodes().then(data => {
      this.files = data;
    });
  }

  navigateToAddCondition(rowData: any) {
    this.selectedRule = rowData.id;
    this.displayAddConditionDialog = true;
  }


  openAddRuleDialog() {
    this.displayAddRuleDialog = true;
  }

  onAddRuleDialogClose() {
    this.displayAddRuleDialog = false;
    this.loadData();
  }

  onAddConditionDialogClose() {
    this.displayAddConditionDialog = false;
    this.loadData();
  }

  deleteCondition(rowData: any) {
    console.log(rowData);
    const conditionId = rowData.name.split(':')[1];
    this.conditionService.deleteConditionById(conditionId).subscribe({
      next: () => {
        this.loadData();
      }
    })
  }

  deleteRule(rowData: any) {
    this.ruleService.deleteRuleById(rowData.id).subscribe({
      next: () => {
        this.loadData();
      }
    });
  }

  confirmDelete(rowData: any, isCondition: boolean) {
    const itemType = isCondition ? 'Condition' : 'Rule';

    this.confirmationService.confirm({
      message: `Are you sure you want to delete this ${itemType}?`,
      header: `Delete ${itemType}`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      // rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        if (isCondition) {
          this.deleteCondition(rowData);
        } else {
          this.deleteRule(rowData);
        }
      }
    });
  }
  runRules(){
    this.transactionService.runRules().subscribe();
  }
}

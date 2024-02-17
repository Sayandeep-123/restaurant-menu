import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Item } from 'src/app/menu/menu.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  commonService: CommonService;
  categoryName: string
  itemList: Item[];
  dialogType: string;
  message: string;
  alertType: string;

  @ViewChild('actionButtons') actionButtons: TemplateRef<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, commonService: CommonService) {
    ({ categoryName: this.categoryName, itemList: this.itemList, dialogType: this.dialogType, message: this.message, alertType: this.alertType } = data);
    this.commonService = commonService;
  }

  ngAfterViewInit() {
    this.commonService.actionButtonRef = this.actionButtons;
  }

  cartContentChange(itemId: string, stepper: boolean) {
    this.commonService.cartContentChange(itemId, stepper);
  }
}

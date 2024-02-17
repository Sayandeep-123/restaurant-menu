import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonService, Tabs } from '../services/common.service';
import { MatDrawer } from '@angular/material/sidenav';
import { DialogComponent } from '../common-components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetails, OrdersComponent } from '../orders/orders.component';
import { Item } from '../menu/menu.component';

@Component({
  selector: 'body-layout-wrapper',
  templateUrl: './body-layout-wrapper.component.html',
  styleUrls: ['./body-layout-wrapper.component.scss']
})
export class BodyLayoutWrapperComponent {
  @Input()
  activeTab: Tabs = Tabs.MENU;

  @ViewChild('cart') cart: MatDrawer;

  @Output() cartObject: EventEmitter<MatDrawer> = new EventEmitter<MatDrawer>();

  tab = Tabs
  commonService: CommonService;
  dialog: MatDialog;
  orderNumber: number = 101;

  constructor ( commonService: CommonService, dialog: MatDialog) {
    this.commonService = commonService;
    this.dialog = dialog;
  }

  ngAfterViewInit() {
    this.cartObject.emit(this.cart);
  }

  placeOrder() {
      /*
        Here API should be call to place an order & in response we should get items along with other order details from backend.
      */

      let orderToBePlaced = this.generateNewOrder(this.commonService.cartItems);


      this.commonService.updateOrderDetails('orderFromCustomer', [orderToBePlaced]);
      const dialogRef = this.dialog.open(DialogComponent, {
        data:
        {
          dialogType: 'alertMessage',
          message: 'Order is placed',
          alertType: 'Success'
        }
      });

      this.commonService.cartItems.clear();
      this.commonService.totalCartValue = 0;
  }

  generateNewOrder(cartItems:Map<string, Item>){
    this.orderNumber++;
    let orderItems: Item[] = Array.from(cartItems.values());

    return new OrderDetails('OD'+this.orderNumber, 'In Progress', new Date(), orderItems);
  }

}

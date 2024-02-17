import { Component } from '@angular/core';
import { Item } from '../menu/menu.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  currOrderDetails: OrderDetails[] = [];
  pastOrderDetails: OrderDetails[] = [];
  commonService: CommonService;
  panelOpenState: boolean = true;
  displayedColumns: string[] = ['item', 'quantity', 'price'];

  constructor(commonService: CommonService) {
    this.commonService = commonService;
  }

  ngOnInit() {
    this.generateOrderDetails();
  }


  generateOrderDetails () {
    this.commonService.orderDetails$.subscribe((orderDetails: OrderDetails[])=> {
      for(let orderDetail of orderDetails) {
        orderDetail.orderDate = new Date(orderDetail.orderDate);
        if(orderDetail.orderStatus === 'In Progress') {
          this.currOrderDetails.push(orderDetail);
        }
        else {
          this.pastOrderDetails.push(orderDetail);
        }
      }
    });
    this.currOrderDetails.sort((a, b) => {
      return b.orderDate.getTime() - a.orderDate.getTime();
    });
    this.pastOrderDetails.sort((a, b) => {
      return b.orderDate.getTime() - a.orderDate.getTime();
    });
    this.commonService.getAllOrderItems();
    console.log(this.currOrderDetails, this.pastOrderDetails);
  }

  updateOrderDetails(updateType: string, orderDetails: OrderDetails[]) {
    if(updateType === 'orderFromCustomer') {
      this.currOrderDetails = [...orderDetails, ...this.currOrderDetails];
    }
  }
}


export class OrderDetails {
  orderId: string;
  orderStatus: string;
  orderDate: Date;
  orderItems: Item[];

  constructor(orderId: string, orderStatus: string, orderDate: Date, orderItems:Item[]) {
    this.orderId = orderId;
    this.orderStatus = orderStatus;
    this.orderDate = orderDate;
    this.orderItems = orderItems;
  }
}

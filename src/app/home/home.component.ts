import { Component, Input } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { CommonService, Tabs } from '../services/common.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Input()
  activeTab : Tabs = Tabs.MENU;

  tabs = Tabs;
  cart: MatDrawer;
  commonService: CommonService;

  constructor(commonService: CommonService) {
    this.commonService = commonService;
  }

  changeActiveTab (event : MatButtonToggleChange) {
    this.activeTab = event.value;
  }

  cartTemplate(event: any) {
    this.cart = event;
    console.log('Cart is here:', this.cart);
  }

  openDrawer() {
    
  }

}

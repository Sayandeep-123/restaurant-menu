import { Component, Input } from '@angular/core';
import { Item } from 'src/app/menu/menu.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-item-quatity',
  templateUrl: './item-quatity.component.html',
  styleUrls: ['./item-quatity.component.scss']
})
export class ItemQuatityComponent {

  @Input()
  item: Item;

  commonService: CommonService;

  constructor(
    commonService: CommonService
  ) {
    this.commonService = commonService;
  }

  cartContentChange(itemId: string, stepper: boolean) {
    this.commonService.cartContentChange(itemId, stepper);
  }

}

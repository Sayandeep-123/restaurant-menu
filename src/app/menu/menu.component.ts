import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../common-components/dialog/dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  commonService: CommonService;
  dialog: MatDialog;

  specialItems: Item[] = [];
  cartItems: Item[] = [];
  regularItems: Map<string, Item[]> = new Map<string, Item[]>();
  allItemsMap: Map<string, Item> = new Map<string, Item>();
  // specialItemsMap: Map<string, Item> = new Map<string, Item>();
  categories: Item[] = [];

  constructor(commonService: CommonService, dialog: MatDialog) {
    this.commonService = commonService;
    this.dialog = dialog;
  }

  ngOnInit() {
    this.commonService.getAllItems().subscribe((res: any)=> {
      this.specialItems = res[0];
      this.convertItemArrayToMap(this.specialItems);

      // this.specialItems.forEach(item => {
      //   this.specialItemsMap.set(item.id, {...item});
      // });
      
      Object.keys(res[1]).forEach(category => {
        this.regularItems.set(category, res[1][category]);
        this.convertItemArrayToMap(res[1][category]);
      });
      
      this.categories = res[2];
      this.commonService.allItemsMap = this.allItemsMap;
        
    });
  }

  cartContentChange(itemId: string, stepper: boolean, event: any) {
    this.commonService.cartContentChange(itemId, stepper);
    this.allItemsMap = this.commonService.allItemsMap;
    console.log(event);
    // console.log(this.allItemsMap);
    // console.log(this.regularItems);
    // console.log(this.categories);
  }

  convertItemArrayToMap(items: Item[]) {
    items.forEach(item => {
      this.allItemsMap.set(item.id, { ...item });
    });
  }

  openRegularMenu(categoryName: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data:
      {
        categoryName: categoryName,
        itemList: this.regularItems.get(categoryName),
        dialogType: 'itemList',
      }
    });
  }

}


export class Item {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  isSelected?: boolean = false;
  quantity?: number = 0;

  constructor(id: string, name: string, description: string, image?: string, isSelected?: boolean, quantity?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.isSelected = isSelected;
    this.quantity = quantity;
  }
}

import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Item } from '../menu/menu.component';
import { OrderDetails } from '../orders/orders.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  allItemsMap: Map<string, Item> = new Map<string, Item>();
  cartItems: Map<string, Item> = new Map<string, Item>();
  actionButtonRef: TemplateRef<any>;
  totalCartValue: number = 0;

  // Order details related variables
  
  private orderDetailsSubject = new Subject<any>();
  orderDetails$ = this.orderDetailsSubject.asObservable();
  orderDetails: any[] = ALL_ORDER_DETAILS;

  constructor() { }


  /*
    API call to receive all the items for particular restaurant
  */
  getAllItems() : Observable<any> {
    return of(ALL_ITEMS);
  }

  cartContentChange(itemId: string, stepper: boolean) {
    let itemDetails = this.allItemsMap.get(itemId);

    if (itemDetails.quantity === 0 && stepper) {
      itemDetails.isSelected = true;
      itemDetails.quantity++;
      this.totalCartValue += itemDetails.price;
    }
    else if (stepper) {
      itemDetails.quantity++;
      this.totalCartValue += itemDetails.price;
    }
    else if (itemDetails.quantity > 1 && !stepper) {
      itemDetails.quantity--;
      this.totalCartValue -= itemDetails.price;
    }
    else if (itemDetails.quantity === 1 && !stepper) {
      itemDetails.quantity--;
      itemDetails.isSelected = false;
      this.totalCartValue -= itemDetails.price;
    }

    this.allItemsMap.set(itemId, itemDetails);

    if(!itemDetails.isSelected) {
      this.cartItems.delete(itemId);
    } else {
      this.cartItems.set(itemId, itemDetails);
    }
  }

  /*
    API call to receive all the orders for particular customer in restaurant
  */

  getAllOrderItems() {
    // Do an API call to receive the orders and update the orderDetails
    this.orderDetailsSubject.next(this.orderDetails);
  }

  /*
  Place order will call this method and there should be an API call to update the DB receive the response with the changed orderDetails
  */
  updateOrderDetails(updateType: string, orderDetails: OrderDetails[]) {
    if(updateType === 'orderFromCustomer') {
      this.orderDetails = [...orderDetails, ...this.orderDetails];
    }
    this.orderDetailsSubject.next(this.orderDetails);
  }

}

export enum Tabs {
  MENU = "menu",
  ORDERS = "orders",
  ABOUTUS = "aboutus"
}



/* ---- Mock response of all the items from particular restaurant ----- */

const ALL_ITEMS = [
  [
    {
      "id": "101",
      "name": "Paneer Tikka in Skewers",
      "description": "Delectable Indian appetizer where marinated cubes of paneer are threaded onto skewers and grilled to perfection, offering a smoky and spicy culinary delight that tantalizes the senses with each savory bite.",
      "image": "../../assets/dishe-image-1.jpeg",
      "price": 12.99,
      "isSelected": false,
      "quantity": 0,
    },
    {
      "id": "102",
      "name": "Paneer Tikka in Skewers",
      "description": "Delectable Indian appetizer where marinated cubes of paneer are threaded onto skewers and grilled to perfection, offering a smoky and spicy culinary delight that tantalizes the senses with each savory bite.",
      "image": "../../assets/dish-image-2.jpeg",
      "price": 11.99,
      "isSelected": false,
      "quantity": 0,
    },
    {
      "id": "103",
      "name": "Paneer Tikka in Skewers",
      "description": "Delectable Indian appetizer where marinated cubes of paneer are threaded onto skewers and grilled to perfection, offering a smoky and spicy culinary delight that tantalizes the senses with each savory bite.",
      "image": "../../assets/dish-image-3.jpeg",
      "price": 10.99,
      "isSelected": false,
      "quantity": 0,
    },
    {
      "id": "104",
      "name": "Paneer Tikka in Skewers",
      "description": "Delectable Indian appetizer where marinated cubes of paneer are threaded onto skewers and grilled to perfection, offering a smoky and spicy culinary delight that tantalizes the senses with each savory bite.",
      "image": "../../assets/dish-image-4.jpeg",
      "price": 9.99,
      "isSelected": false,
      "quantity": 0,
    }
  ],
  {
    "Indian": [
      { "id": "1", "name": "Biryani", "description": "Fragrant rice dish with aromatic spices.", "isSelected": false, "quantity": 0, "price": 9.99 },
      { "id": "2", "name": "Butter Chicken", "description": "Creamy chicken curry with a rich tomato sauce.", "isSelected": false, "quantity": 0, "price": 11.99 },
      { "id": "3", "name": "Saag Paneer", "description": "Spinach curry with cubes of paneer (Indian cottage cheese).", "isSelected": false, "quantity": 0, "price": 10.99 },
      { "id": "4", "name": "Chole Bhature", "description": "Spiced chickpea curry with deep-fried bread.", "isSelected": false, "quantity": 0, "price": 8.99 },
      { "id": "5", "name": "Dhokla", "description": "Steamed fermented lentil cake, served as a snack.", "isSelected": false, "quantity": 0, "price": 7.99 },
      { "id": "6", "name": "Aloo Gobi", "description": "Potato and cauliflower curry with Indian spices.", "isSelected": false, "quantity": 0, "price": 9.99 },
      { "id": "7", "name": "Palak Chaat", "description": "Crispy spinach topped with yogurt and chutneys.", "isSelected": false, "quantity": 0, "price": 6.99 },
      { "id": "8", "name": "Rajma Chawal", "description": "Kidney bean curry served with steamed rice.", "isSelected": false, "quantity": 0, "price": 10.99 },
      { "id": "9", "name": "Pav Bhaji", "description": "Spiced mashed vegetables served with buttered bread.", "isSelected": false, "quantity": 0, "price": 8.99 },
      { "id": "10", "name": "Dahi Puri", "description": "Small crispy puris filled with yogurt, chutneys, and potatoes.", "isSelected": false, "quantity": 0, "price": 7.99 }
    ],
    "Continental": [
      { "id": "11", "name": "Chicken Alfredo Pasta", "description": "Creamy pasta with grilled chicken and Alfredo sauce.", "isSelected": false, "quantity": 0, "price": 14.99 },
      { "id": "12", "name": "Margherita Pizza", "description": "Classic pizza with tomato sauce, mozzarella, and basil.", "isSelected": false, "quantity": 0, "price": 12.99 },
      { "id": "13", "name": "Caesar Salad", "description": "Romaine lettuce, croutons, Parmesan, and Caesar dressing.", "isSelected": false, "quantity": 0, "price": 8.99 },
      { "id": "14", "name": "Quiche Lorraine", "description": "Savory pie with bacon, eggs, and cheese.", "isSelected": false, "quantity": 0, "price": 11.99 },
      { "id": "15", "name": "Spinach and Mushroom Risotto", "description": "Creamy Italian rice dish with vegetables.", "isSelected": false, "quantity": 0, "price": 10.99 },
      { "id": "16", "name": "Bruschetta", "description": "Toasted bread with tomatoes, garlic, and basil.", "isSelected": false, "quantity": 0, "price": 6.99 },
      { "id": "17", "name": "Eggplant Parmesan", "description": "Breaded and baked eggplant with marinara sauce.", "isSelected": false, "quantity": 0, "price": 9.99 },
      { "id": "18", "name": "Chicken Piccata", "description": "Chicken cutlets in a lemon and caper sauce.", "isSelected": false, "quantity": 0, "price": 12.99 },
      { "id": "19", "name": "Caprese Salad", "description": "Fresh tomato, mozzarella, basil, and balsamic glaze.", "isSelected": false, "quantity": 0, "price": 8.99 },
      { "id": "20", "name": "Grilled Vegetable Panini", "description": "Sandwich with grilled vegetables and cheese.", "isSelected": false, "quantity": 0, "price": 10.99 }
    ],
    "Chinese": [
      { "id": "21", "name": "Sweet and Sour Chicken", "description": "Crispy chicken in a sweet and tangy sauce.", "isSelected": false, "quantity": 0, "price": 10.99 },
      { "id": "22", "name": "Vegetable Spring Rolls", "description": "Crispy rolls filled with vegetables.", "isSelected": false, "quantity": 0, "price": 8.99 },
      { "id": "23", "name": "Kung Pao Tofu", "description": "Spicy tofu stir-fry with peanuts and vegetables.", "isSelected": false, "quantity": 0, "price": 9.99 },
      { "id": "24", "name": "Dim Sum Platter", "description": "Assorted steamed or fried dumplings.", "isSelected": false, "quantity": 0, "price": 11.99 },
      { "id": "25", "name": "General Tso's Chicken", "description": "Deep-fried chicken in a sweet and spicy sauce.", "isSelected": false, "quantity": 0, "price": 12.99 },
      { "id": "26", "name": "Mapo Tofu", "description": "Tofu and minced meat in a spicy sauce.", "isSelected": false, "quantity": 0, "price": 9.99 },
      { "id": "27", "name": "Chow Mein", "description": "Stir-fried noodles with vegetables and meat.", "isSelected": false, "quantity": 0, "price": 8.99 },
      { "id": "28", "name": "Peking Duck", "description": "Roast duck served with pancakes and hoisin sauce.", "isSelected": false, "quantity": 0, "price": 15.99 },
      { "id": "29", "name": "Szechuan Shrimp", "description": "Spicy shrimp stir-fry with Szechuan sauce.", "isSelected": false, "quantity": 0, "price": 13.99 },
      { "id": "30", "name": "Mongolian Beef", "description": "Stir-fried beef with scallions and a savory sauce.", "isSelected": false, "quantity": 0, "price": 14.99 }
    ],
    "Italian": [
      { "id": "31", "name": "Spaghetti Bolognese", "description": "Pasta with a rich meat-based tomato sauce.", "price": 15.99, "isSelected": false, "quantity": 0 },
      { "id": "32", "name": "Lasagna", "description": "Layered pasta with meat, cheese, and tomato sauce.", "price": 18.99, "isSelected": false, "quantity": 0 },
      { "id": "33", "name": "Fettuccine Alfredo", "description": "Creamy pasta with butter and Parmesan cheese.", "price": 14.99, "isSelected": false, "quantity": 0 },
      { "id": "34", "name": "Ravioli with Marinara", "description": "Pasta filled with cheese or meat, served with marinara sauce.", "price": 16.99, "isSelected": false, "quantity": 0 },
      { "id": "35", "name": "Margherita Pizza", "description": "Classic pizza with tomato, cheese, and basil.", "price": 12.99, "isSelected": false, "quantity": 0 },
      { "id": "36", "name": "Tiramisu", "description": "Coffee-flavored Italian dessert with layers of mascarpone and ladyfingers.", "price": 9.99, "isSelected": false, "quantity": 0 },
      { "id": "37", "name": "Bruschetta", "description": "Toasted bread with tomatoes, garlic, and basil.", "price": 7.99, "isSelected": false, "quantity": 0 },
      { "id": "38", "name": "Minestrone Soup", "description": "Vegetable and pasta soup.", "price": 10.99, "isSelected": false, "quantity": 0 },
      { "id": "39", "name": "Caprese Salad", "description": "Fresh tomato, mozzarella, and basil salad.", "price": 8.99, "isSelected": false, "quantity": 0 },
      { "id": "40", "name": "Gnocchi with Pesto", "description": "Soft potato dumplings with basil pesto.", "price": 13.99, "isSelected": false, "quantity": 0 }
    ],
    "Fast Food": [
      { "id": "41", "name": "Cheeseburger", "description": "Hamburger with melted cheese.", "price": 6.99, "isSelected": false, "quantity": 0 },
      { "id": "42", "name": "Chicken Nuggets", "description": "Bite-sized breaded and fried chicken.", "price": 5.99, "isSelected": false, "quantity": 0 },
      { "id": "43", "name": "French Fries", "description": "Deep-fried potato sticks.", "price": 4.99, "isSelected": false, "quantity": 0 },
      { "id": "44", "name": "Hot Dog", "description": "Sausage served in a sliced bun.", "price": 3.99, "isSelected": false, "quantity": 0 },
      { "id": "45", "name": "Chicken Quesadilla", "description": "Tortilla filled with chicken and cheese.", "price": 7.99, "isSelected": false, "quantity": 0 },
      { "id": "46", "name": "Nachos", "description": "Tortilla chips topped with cheese and toppings.", "price": 5.99, "isSelected": false, "quantity": 0 },
      { "id": "47", "name": "Chicken Wings", "description": "Deep-fried or baked chicken wings.", "price": 8.99, "isSelected": false, "quantity": 0 },
      { "id": "48", "name": "Grilled Cheese Sandwich", "description": "Sandwich with melted cheese.", "price": 4.99, "isSelected": false, "quantity": 0 },
      { "id": "49", "name": "Margarita Pizza", "description": "Pizza with tomato, cheese, and herbs.", "price": 9.99, "isSelected": false, "quantity": 0 },
      { "id": "50", "name": "Onion Rings", "description": "Deep-fried battered onion rings.", "price": 3.99, "isSelected": false, "quantity": 0 }
    ]
  },
  [
    {
      "id":"C1",
      "name":"Indian",
      "image": "../../assets/cuisine-image-1.jpeg",
    }
    ,
    {
      "id":"C2",
      "name":"Continental",
      "image": "../../assets/cuisine-image-2.jpeg",
    },
    {
      "id":"C3",
      "name":"Italian",
      "image": "../../assets/cuisine-image-3.jpeg",
    },
    {
      "id":"C4",
      "name":"Chinese",
      "image": "../../assets/cuisine-image-4.jpeg",
    },
    {
      "id":"C5",
      "name":"Fast Food",
      "image": "../../assets/cuisine-image-5.jpeg",
    }
  ]
];

/* ----- Mock response of all the order details ----- */

const ALL_ORDER_DETAILS = [
    {
      "orderId": "OD001",
      "orderStatus": "In Progress",
      "orderDate": "2024-01-21T10:30:00.000Z",
      "orderItems": [
        {"id": "101", "name": "Paneer Tikka in Skewers", "price": 12.99, "quantity": 2},
        {"id": "11", "name": "Chicken Alfredo Pasta", "price": 14.99, "quantity": 1},
        { "id": "9", "name": "Pav Bhaji", "price": 8.99, "quantity": 4 },

      ]
    },
    {
      "orderId": "OD002",
      "orderStatus": "In Progress",
      "orderDate": "2024-01-21T12:45:00.000Z",
      "orderItems": [
        {"id": "103", "name": "Paneer Tikka in Skewers", "price": 10.99, "quantity": 1},
        {"id": "31", "name": "Spaghetti Bolognese", "price": 15.99, "quantity": 1}
        
      ]
    },
    {
      "orderId": "OD003",
      "orderStatus": "In Progress",
      "orderDate": "2024-01-21T15:20:00.000Z",
      "orderItems": [
        {"id": "45", "name": "Chicken Quesadilla", "price": 7.99, "quantity": 3},
        {"id": "18", "name": "Chicken Piccata", "price": 12.99, "quantity": 1},
        { "id": "20", "name": "Grilled Vegetable Panini", "price": 10.99, "quantity": 2 }
        
      ]
    },
    {
      "orderId": "OD004",
      "orderStatus": "In Progress",
      "orderDate": "2024-01-21T17:40:00.000Z",
      "orderItems": [
        {"id": "28", "name": "Peking Duck", "price": 15.99, "quantity": 1},
        {"id": "35", "name": "Margherita Pizza", "price": 12.99, "quantity": 2},
        { "id": "9", "name": "Pav Bhaji", "price": 8.99, "quantity": 3 },
        
      ]
    },
    {
      "orderId": "OD005",
      "orderStatus": "In Progress",
      "orderDate": "2024-01-21T19:15:00.000Z",
      "orderItems": [
        {"id": "22", "name": "Vegetable Spring Rolls", "price": 8.99, "quantity": 2},
        {"id": "38", "name": "Minestrone Soup", "price": 10.99, "quantity": 1}
        
      ]
    },
    {
      "orderId": "OD006",
      "orderStatus": "Past Order",
      "orderDate": "2024-01-20T21:00:00.000Z",
      "orderItems": [
        {"id": "50", "name": "Onion Rings", "price": 3.99, "quantity": 1},
        {"id": "36", "name": "Tiramisu", "price": 9.99, "quantity": 1},
        { "id": "20", "name": "Grilled Vegetable Panini", "price": 10.99, "quantity": 2 }
      ]
    },
    {
      "orderId": "OD007",
      "orderStatus": "Past Order",
      "orderDate": "2024-01-20T23:30:00.000Z",
      "orderItems": [
        {"id": "7", "name": "Palak Chaat", "price": 6.99, "quantity": 2},
        {"id": "15", "name": "Spinach and Mushroom Risotto", "price": 10.99, "quantity": 1},
        { "id": "47", "name": "Chicken Wings", "price": 8.99, "quantity": 4 },
      ]
    },
    {
      "orderId": "OD008",
      "orderStatus": "Past Order",
      "orderDate": "2024-01-20T02:15:00.000Z",
      "orderItems": [
        {"id": "44", "name": "Hot Dog", "price": 3.99, "quantity": 1},
        {"id": "48", "name": "Grilled Cheese Sandwich", "price": 4.99, "quantity": 1}
        
      ]
    },
    {
      "orderId": "OD009",
      "orderStatus": "Past Order",
      "orderDate": "2024-01-20T04:45:00.000Z",
      "orderItems": [
        {"id": "27", "name": "Chow Mein", "price": 8.99, "quantity": 2},
        {"id": "34", "name": "Ravioli with Marinara", "price": 16.99, "quantity": 1}
        
      ]
    },
    {
      "orderId": "OD010",
      "orderStatus": "Past Order",
      "orderDate": "2024-01-20T07:10:00.000Z",
      "orderItems": [
        {"id": "13", "name": "Caesar Salad", "price": 8.99, "quantity": 1},
        {"id": "46", "name": "Nachos", "price": 5.99, "quantity": 1},
        { "id": "9", "name": "Pav Bhaji", "price": 8.99, "quantity": 2 },
        { "id": "47", "name": "Chicken Wings", "price": 8.99, "quantity": 4 },
      ]
    }
];
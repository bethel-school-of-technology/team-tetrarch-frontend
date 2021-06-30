import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { Items } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
    
    // items: Items;

    // constructor(private accountService: AccountService) {
    //     this.accountService.items.subscribe(x => this.items = x);
    // }


    logout() {
        this.accountService.logout();
    }

}

// Component({ selector: 'app', templateUrl: 'app.component.html' })
// export class AppItemComponent {
//     item: Items;

//     constructor(private itemService: ItemService) {
//         this.itemService.item.subscribe(x => this.item = x);
//     }


  

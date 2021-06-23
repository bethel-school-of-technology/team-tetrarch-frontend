import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { Item } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }


    logout() {
        this.accountService.logout();
    }
}

Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    item: Items;

    constructor(private ItemService: ItemService) {
        this.itemService.item.subscribe(x => this.item = x);
    }


    logout() {
        this.accountService.logout();
    }
}
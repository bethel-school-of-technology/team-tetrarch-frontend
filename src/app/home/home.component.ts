import { Component } from '@angular/core';
import { Items, User } from '@app/_models';
import { AccountService, ItemService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
   

}

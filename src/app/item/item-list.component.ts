import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'item-list.component.html' })
export class ItemListComponent implements OnInit {
    items = [];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(item => this.items = item);
    }

    deleteItem(id: string) {
        const user = this.items.find(x => x.id === id);
        //this.items.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.items = this.items.filter(x => x.id !== id) 
            });
    }
}
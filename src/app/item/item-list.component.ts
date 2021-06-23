import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'item-list.component.html' })
export class ItemListComponent implements OnInit {
    item = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(item => this.item = item);
    }

    deleteItem(id: string) {
        const user = this.item.find(x => x.id === id);
        this.item.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.item = this.item.filter(x => x.id !== id) 
            });
    }
}
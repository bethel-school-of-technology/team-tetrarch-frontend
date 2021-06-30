import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ItemService } from '@app/_services';

@Component({ templateUrl: 'item-list.component.html' })
export class ItemListComponent implements OnInit {
    items = [];

    constructor(private itemService: ItemService) {}

    ngOnInit() {
        this.itemService.getAll()
            .pipe(first())
            .subscribe(item => {this.items = item;
            console.log(item)
            });
    }

    deleteItem(id: string) {
        const user = this.items.find(x => x.id === id);
        //this.items.isDeleting = true;
        this.itemService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.items = this.items.filter(x => x.id !== id) 
            });
    }
}
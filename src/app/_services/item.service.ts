import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Items } from '@app/_models/item';

@Injectable({ providedIn: 'root' })
export class ItemService {
    private itemSubject: BehaviorSubject<Items>;
    public item: Observable<Items>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.itemSubject = new BehaviorSubject<Items>(JSON.parse(localStorage.getItem('itemID')));
        this.item = this.itemSubject.asObservable();
    }

    public get itemValue(): Items {
        return this.itemSubject.value;
    }

   

    register(item: Items) {
        let newItem = {
            ItemName: item.itemName,
            Description: item.itemDescription,
            Console: item.itemConsole,
            Quantity: item.itemQuantity,
            StoreName: item.itemStoreName,
            Price: item.itemPrice

        }
        return this.http.post(`${environment.apiUrl}/api/Items`, newItem);
    }

    getAll() {
        return this.http.get<Items[]>(`${environment.apiUrl}/api/Items`);
    }

    getById(itemID: string) {
        return this.http.get<Items>(`${environment.apiUrl}/api/Items/${itemID}`);
    }

    update(itemID, params) {
        return this.http.put(`${environment.apiUrl}/api/Items/${itemID}`, params)
            .pipe(map(x => {
                // update stored item if the Seller User in item Management updated their own record
                if (itemID == this.itemValue.itemID) {
                    // update local storage
                    const item = { ...this.itemValue, ...params };
                    localStorage.setItem('item', JSON.stringify(item));

                    // publish updated item to subscribers
                    this.itemSubject.next(item);
                }
                return x;
            }));
    }

    delete(itemID: string) {
        return this.http.delete(`${environment.apiUrl}/api/Items/${itemID}`)
            
    }
}
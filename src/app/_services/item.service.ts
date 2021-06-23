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
        this.itemSubject = new BehaviorSubject<Items>(JSON.parse(localStorage.getItem('itemId')));
        this.item = this.itemSubject.asObservable();
    }

    public get itemValue(): Items {
        return this.itemSubject.value;
    }

   

    register(item: Items) {
        return this.http.post(`${environment.apiUrl}/item/register`, item);
    }

    getAll() {
        return this.http.get<Items[]>(`${environment.apiUrl}/api/Items`);
    }

    getById(itemId: string) {
        return this.http.get<Items>(`${environment.apiUrl}/item/${itemId}`);
    }

    update(itemId, params) {
        return this.http.put(`${environment.apiUrl}/item/${itemId}`, params)
            .pipe(map(x => {
                // update stored item if the Seller User in item Management updated their own record
                if (itemId == this.itemValue.itemId) {
                    // update local storage
                    const item = { ...this.itemValue, ...params };
                    localStorage.setItem('item', JSON.stringify(item));

                    // publish updated item to subscribers
                    this.itemSubject.next(item);
                }
                return x;
            }));
    }

    delete(itemId: string) {
        return this.http.delete(`${environment.apiUrl}/item/${itemId}`)
            
    }
}
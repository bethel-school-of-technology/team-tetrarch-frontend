import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('/api/Users')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(userName, password) {
        return this.http.post<User>(`${environment.apiUrl}/api/Users/userName`, { userName, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('/api/User/logout');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/api/Users`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/Users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/api/Users/${id}`);
    }

    update(id, user: User) {
        console.log(id, user);
        return this.http.put(`${environment.apiUrl}/api/Users/${id}`, user);
    }

    delete(id: string) {
        return this.http.delete<User>(`${environment.apiUrl}/api/Users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.UserId) {
                    this.logout();
                }
                return x;
            }));
    }
}
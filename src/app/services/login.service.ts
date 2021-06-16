import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   getLogin() { 
     let user = 'javajoshua';
    return  user;
   }
   
}

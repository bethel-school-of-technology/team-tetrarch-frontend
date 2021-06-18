import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  post = (field1:string, field2:string, field3:boolean) => {
    alert(field1 + field2 + field3)
  }
  constructor() { }
}

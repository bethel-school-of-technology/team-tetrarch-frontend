import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: any;
  
  submit = (field1:string, field2:string, field3:boolean) => {
    this.post(field1, field2, field3)
  };

  constructor(service: PostService,) {
    this.post = service.post
   };

  ngOnInit(): void {
  }

}

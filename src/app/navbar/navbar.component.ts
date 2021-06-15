import { Component, OnInit } from '@angular/core';
import { navbar } from '../models/navbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
navbarItems = [ 'Home', 'Search', 'Contacts', 'Login'];
  constructor() { }

  ngOnInit(): void {
  }

}

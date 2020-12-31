import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  open: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(open: boolean): void {
    this.open = open;
  }
}

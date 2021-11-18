import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  isShowing = true; // was flase
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      //this.isShowing = false;
    }
  }
  
  constructor() {
    console.log('Sidebar constructor called');
  }

  ngOnInit() {
  }
}

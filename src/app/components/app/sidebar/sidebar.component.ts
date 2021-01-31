import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: SideBarItem[];

  open: boolean;
  constructor() { }

  ngOnInit(): void {

    const href = window.location.href;
    const dashboard = href.indexOf('/dashboard') !== -1;
    const flight = href.indexOf('/flight') !== -1;
    const hotel = href.indexOf('/hotel') !== -1;
    const finance = href.indexOf('/finance') !== -1;
    const core = href.indexOf('/core') !== -1;
    const membership = href.indexOf('/membership') !== -1;

    this.menu = [
      {
        text: 'PNL_DASHBOARD',
        icon: 'nav-icon i-Bar-Chart',
        path: '/dashboard',
        children: [],
        expanded: dashboard,
        active: dashboard
      },
      {
        text: 'USERS',
        icon: 'nav-icon i-Administrator',
        path: '/users',
        children: [],
        expanded: dashboard,
        active: dashboard
      },
      {
        text: 'TRANSACTIONS',
        icon: 'nav-icon i-Add-Cart',
        path: '/transactions',
        children: [],
        expanded: dashboard,
        active: dashboard
      },
      {
        text: 'CONTACT_US',
        icon: 'nav-icon i-Email',
        path: '/contact',
        children: [],
        expanded: dashboard,
        active: dashboard
      },
      {
        text: 'BLOG',
        icon: 'nav-icon i-Newspaper',
        path: '/blog',
        children: [],
        expanded: dashboard,
        active: dashboard
      },
      {
        text: 'MARKETERS',
        icon: 'nav-icon i-Add-UserStar',
        path: '/marketers',
        children: [],
        expanded: dashboard,
        active: dashboard
      },
      {
        text: 'ERRORS',
        icon: 'nav-icon i-Security-Bug',
        path: '/errors',
        children: [],
        expanded: dashboard,
        active: dashboard
      },
      {
        text: 'DISCOUNTS',
        icon: 'nav-icon i-Dollar-Sign-2',
        path: '/discounts',
        children: [],
        expanded: dashboard,
        active: dashboard
      },
      {
        text: 'PLANS',
        icon: 'nav-icon i-Billing',
        path: '/plans',
        children: [],
        expanded: dashboard,
        active: dashboard
      },
    ];
  }

  toggle(open: boolean): void {
    this.open = open;
  }

  expand(m: SideBarItem): void {
    if (m.disabled) { return; }
    this.menu.forEach(mnu => mnu.expanded = mnu.active = false);
    m.active = true;
    if (m.children.length) {
      m.expanded = !!!m.expanded;
    }
  }
}
export interface SideBarItem {
  text: string;
  icon: string;
  image?: string;
  path?: string;
  expanded?: boolean;
  disabled?: boolean;
  active?: boolean;
  children: SideBarItem[];
}

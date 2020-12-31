import {Component, Inject, Input, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {IdentityService} from '../../../services/auth/identity.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  fullScreen: boolean;
  open: boolean;

  constructor(
    readonly identityService: IdentityService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.open = true;
    this.fullScreen = false;
  }

  openFullScreen(): void {
    this.fullScreen = true;
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  exitFullScreen(): void {
    this.fullScreen = false;
    if (document.fullscreenElement) {
      let promise;
      const elem = document as any;
      if (elem.exitFullscreen) {
        promise = elem.exitFullscreen();
      } else if (elem.webkitExitFullscreen) { /* Safari */
        promise = elem.webkitExitFullscreen();
      } else if (elem.msExitFullscreen) { /* IE11 */
        promise = elem.msExitFullscreen();
      }
      promise.catch((err) => console.error(err));
    }

  }

  toggleFullScreen(): void {
    if (this.fullScreen) {
      this.exitFullScreen();
      return;
    }
    this.openFullScreen();
  }

  toggleAside(): void {
    this.open = !this.open;
    const sideBar = document.querySelector('.sidebar-left');
    const mainContent = document.querySelector('.main-content-wrap');
    if (!sideBar || !mainContent) { return; }
    if (this.open) {
      sideBar.classList.add('open');
      mainContent.classList.add('sidenav-open');
    } else {
      sideBar.classList.remove('open');
      mainContent.classList.remove('sidenav-open');
    }
  }

  logout(): void {
    this.identityService.logout();
    this.router.navigateByUrl('/login');
  }
}

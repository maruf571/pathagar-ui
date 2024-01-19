import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input()
  layoutType!: string;

  @Output()
  collapsedEvent = new EventEmitter<boolean>();

  name!:  string;
  showMenu!: string;
  isActive!: boolean;
  collapsed!: boolean;
  pushRightClass!: string;


  constructor(public router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit(): void {
    this.showMenu = ''
    this.isActive = false;
    this.collapsed = false;
    this.pushRightClass = 'push-right';
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: any = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  onLoggedOut() {
    localStorage.removeItem('tokenData');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }


  ngOnDestroy(): void {
    //this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
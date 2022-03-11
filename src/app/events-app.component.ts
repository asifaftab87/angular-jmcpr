import { AuthService } from 'src/app/user/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'events-app',
  template: `
              <nav-bar></nav-bar>
              <router-outlet></router-outlet>
            `
})
export class EventsAppComponent implements OnInit{
  constructor(private auth: AuthService){}
  ngOnInit(): void {
    this.auth.checkAuthenticationStatus();
  }
}

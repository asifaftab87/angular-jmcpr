import { EventService } from './../events/shared/event.service';
import { ISession } from './../events/shared/event.model';
import { Component } from "@angular/core";
import { AuthService } from "../user/auth.service";

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles:[`
        .nav.navbar-nav {font-size: 15px;}
        #searchForm {margin-right: 100px;}
        @media (max-widht: 1200px) {#searchForm {display: none}}
        li > a.active { color: #F97924; }
    `]  
})
export class NavBarComponent {
    searchTerm: string = '';
    foundSessions: any[] = [];
    constructor(public authService: AuthService, private eventService: EventService){}
    searchSessions(searchTerm: string){
        this.eventService.searchSessions(searchTerm)
            .subscribe(sessions=> {
                this.foundSessions = sessions;
            })
    }
}
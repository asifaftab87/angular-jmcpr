import { ISession } from './../shared/event.model';
import { IEvent } from '../shared/event.model';
import { Component, OnInit } from "@angular/core";
import { EventService } from "../shared/event.service"; 
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    templateUrl: './event-details.component.html',
    styles: [
        `
            .container { padding-left: 20px; padding-right: 20px; }
            .event-image { height: 100px; }
            a { cursor: pointer }
        `
    ]
})
export class EventDetailsComponent implements OnInit{
    event!: IEvent;
    addMode: boolean = false;
    filterBy: string = 'all';
    sortBy: string = 'votes';

    constructor(private eventService: EventService, private route: ActivatedRoute){
    }
    ngOnInit(): void {
        //const id: number = +this.route.snapshot.params['id'];
        //this.event = this.eventService.getEvent(id);
        this.route.params.forEach((params: Params)=> {
            this.eventService.getEvent(+params['id']).subscribe((event: IEvent)=> {
                this.event = event;
                this.addMode = false
            })
            //this.event = this.eventService.getEvent(+params['id'])
        })
    }
    addSession(){
        this.addMode = true;
    }
    saveNewSession(session: ISession){
        const nextId = Math.max.apply(null, this.event.sessions.map(s=> s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event)
        this.addMode = false
    }
    cancelNewSession(ev: any){
        this.addMode = false
    }
}
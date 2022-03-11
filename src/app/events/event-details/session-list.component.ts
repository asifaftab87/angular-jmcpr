import { VoterService } from './voter.service';
import { ISession } from './../shared/event.model';
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { AuthService } from 'src/app/user/auth.service';

@Component({
    templateUrl: 'session-list.component.html',
    selector: 'session-list'
})
export class SessionListComponent implements OnChanges{
    @Input() sessions: ISession[] = []
    @Input() filterBy!: string;
    @Input() sortBy!: string;
    @Input() eventId!: number;
    visibleSessions: ISession[] = [];
    constructor(public auth: AuthService, private voterService: VoterService){}

    toggleVote(session: ISession){
        if(this.userHasVoted(session)){
            this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
        } else {
            this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
        }
        if(this.sortBy === 'votes')
            this.visibleSessions.sort(sortByVotesDesc);
    }
    userHasVoted(session: any): boolean{
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(this.sessions){
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortyByNameAsc) : this.visibleSessions.sort(sortByVotesDesc)
        }
    }
    filterSessions(filter: string): ISession[] {
        if(filter==='all'){
            return this.visibleSessions = this.sessions.slice(0);
        } else {
            return this.visibleSessions = this.sessions.filter(session=> {
                    return session.level.toLocaleLowerCase () === filter
            });
        }
    }
}
function sortyByNameAsc(s1: ISession, s2: ISession){
    if(s1.name>s2.name) return 1;
    else if(s1.name === s2.name) return 0;
    else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession){
    return s2.voters.length - s1.voters.length;
}

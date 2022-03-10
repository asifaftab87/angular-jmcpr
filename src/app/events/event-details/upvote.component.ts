import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'upvote',
    styleUrls: ['./upvote.component.css'],
    template: `
        <div class="votingWidgetContainter pointable" (click)="onClick()">
            <div class="well votingWidget">
                <div class="votingButton">
                    <i [style.color]="iconColor" class="glyphicon glyphicon-heart"></i>
                </div>
                <div class="badge badge-inverse votingCount">
                    <div>{{count}}</div>
                </div>
            </div>
        </div>
    `
})
export class UpvoteComponent {
    iconColor!: string;
    @Input() count!: number;
    @Input() set voted(val: boolean){
        this.iconColor = val ? 'red' : 'white';
    } 
    @Output() vote = new EventEmitter();

    onClick(){
        this.vote.emit({})
    }
}

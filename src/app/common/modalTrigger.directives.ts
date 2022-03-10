import { Directive, OnInit, Inject, ElementRef, Input } from "@angular/core";
import { JQ_TOKEN } from "./jQuery.service";

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit{
    private el: any;
    @Input('modal-trigger') modalId!: string; 
    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any){
        this.el = ref.nativeElement;
    }

    ngOnInit(): void {  
        this.el.addEventListener('click', (e: any)=> {
            console.log(this.modalId);
            this.$(`#${this.modalId}`).modal({})
            //this.$('#simple-modal').modal({})
        })
    }
}
export class CreateEvent {
    constructor(
        public name?: string,
        public date?: Date,
        public time?: string,
        public price?:  string,
        public address?: string,
        public city?: string,
        public country?: string,
        public onlineUrl?: string,
        public imageUrl?: string
    ) {}
}
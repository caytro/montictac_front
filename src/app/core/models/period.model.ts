export class Period {
    id!: number;
    start!: Date;
    stop!: Date;
    title!: string | null;

    constructor(id: number, start: Date, stop: Date, title: string|null) {
        this.id = id;
        this.start = start;
        this.stop = stop;
        this.title = title;
    }

 
}
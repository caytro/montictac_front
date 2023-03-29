export class Period {
    id!: number;
    start!: Date;
    stop!: Date;

    constructor(id: number, start: Date, stop: Date) {
        this.id = id;
        this.start = start;
        this.stop = stop;
    }

 
}
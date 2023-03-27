export class Activity {
    title!: string;
    description!: string;
    running!: boolean;

    constructor(title: string, description:string, running: boolean){
        this.title = title;
        this.description = description;
        this.running = running;
    }
}
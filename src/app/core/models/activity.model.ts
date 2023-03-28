import { Period } from "./period.model";

export class Activity {
    id!: number;
    title!: string;
    description!: string;
    periods!: Period[];
    

    constructor(id: number,title: string, description:string, periods: Period[]){
        this.id = id;
        this.title = title;
        this.description = description;
        this.periods = periods;
        
    }
}
export class MenuItemParam {

    caption !: string;
    action !: string;
    url !: string;
    target !: string;

    constructor( param : {caption: string, action: string, url: string, target:string }){
        this.caption = param.caption;
        this.action = param.action;
        this.url = param.url;
        this.target = param.target ?? '_self';
    }
}
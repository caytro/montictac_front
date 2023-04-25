export class MsgBoxParams{
    title!: string ;
    message!: string ;
    mbType!: number;
    responseHandler!: Function ;
    visible: boolean = false;

    static readonly OK_BUTTON = 1;
    static readonly CANCEL_BUTTON = 2;
    static readonly YES_BUTTON = 4;
    static readonly NO_BUTTON = 8;

    constructor(params:{title?: string, message?: string, mbType?: number, responseHandler?: Function, visible?:boolean }){

        this.title = params.title ?? '';
        this.message = params.message ?? '';
        this.mbType = params.mbType ?? 1;
        this.responseHandler = params.responseHandler ?? ((response: string) => {console.log('Non implémenté')});
        this.visible = params.visible ?? false;
    }
}
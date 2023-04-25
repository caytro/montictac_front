import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MsgBoxParams } from '../../models/msg-box-params.model';


/**
 * Usage :
 * html : 
 * <app-message-box *ngIf="msgBoxParams.visible"  (response)="msgBoxParams.responseHandler($event)" [msgBoxParams]="msgBoxParams"></app-message-box>
 * 
 * TS : 
 * let mbType = MsgBoxParams.YES_BUTTON + MsgBoxParams.NO_BUTTON;
    let message = "Confirmer la suppression de ..";
    this.msgBoxParams = new MsgBoxParams({
      title: 'Confirmation', message: message, mbType: mbType, visible: true,
      responseHandler:
        ((response: string) => {
          }
          this.msgBoxParams.visible = false
        })
    });
 */

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input() msgBoxParams!: MsgBoxParams;


  @Output() response = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  displayOkButton():boolean{
    return ((this.msgBoxParams.mbType & MsgBoxParams.OK_BUTTON) !== 0)
  }
  displayCancelButton():boolean{
    return ((this.msgBoxParams.mbType & MsgBoxParams.CANCEL_BUTTON) !== 0)
  }
  displayYesButton():boolean{
    return ((this.msgBoxParams.mbType & MsgBoxParams.YES_BUTTON) !== 0)
  }
  displayNoButton():boolean{
    return ((this.msgBoxParams.mbType & MsgBoxParams.NO_BUTTON) !== 0)
  }

  onClickOkButton() {
    this.response.emit('Ok');
  }
  onClickCancelButton() {
    this.response.emit('Cancel');
  }
  onClickYesButton(){
    this.response.emit('Yes');
  }
  onClickNoButton(){
    this.response.emit('No');
  }



}

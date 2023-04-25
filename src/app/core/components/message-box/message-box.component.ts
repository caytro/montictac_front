import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input() msgBoxParams!: {title: string, message: string, mbType: number, responseHandler: Function}
  
  
  @Output() response = new EventEmitter<string>();
  

  constructor() { }

  ngOnInit(): void {
    
  }
  onClickOkButton(){
    this.response.emit('Ok');
    
  }
  onClickCancelButton(){
    
    this.response.emit('Cancel');
  }

}

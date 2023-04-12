import { Component, Input, OnInit } from '@angular/core';
import { MenuItemParam } from 'src/app/core/models/menu-item-param.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItemParam !: MenuItemParam;
  mouseDown : Boolean = false;

  constructor(){}

  ngOnInit(): void {
    
  }

  onMouseDown(){
    this.mouseDown = true;
  }

  onMouseUp(){
    this.mouseDown = false;
  }

  onMouseOut(){
    this.mouseDown = false;
  }

}

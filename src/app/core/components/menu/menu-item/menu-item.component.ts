import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { MenuItemParam } from 'src/app/core/models/menu-item-param.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItemParam !: MenuItemParam;
  mouseDown : Boolean = false;

  constructor(private monTicTacService : MonTicTacService){}

  ngOnInit(): void {
    
  }

  getUrl():string | null{
    return (this.menuItemParam.url === '' ? null : this.menuItemParam.url);
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

  onClick(){
    this.monTicTacService.getActivityById(1).pipe(
      tap((activity) => {let a = activity;})
    )

  }

}

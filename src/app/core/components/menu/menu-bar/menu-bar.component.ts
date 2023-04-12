import { Component, OnInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuItemParam } from 'src/app/core/models/menu-item-param.model';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  menuItemParams : MenuItemParam[] = [];

  constructor(){}

  ngOnInit(): void {
    this.menuItemParams.push(new MenuItemParam({
      caption : 'Profil',
      action : '',
      url : '',
      target: ''
    }));
    this.menuItemParams.push(new MenuItemParam({
      caption : 'Nouvelle Activité',
      action : '',
      url : 'createActivity',
      target: ''
    }));
    this.menuItemParams.push(new MenuItemParam({
      caption : 'Stats',
      action : '',
      url : '',
      target: ''
    }));
    this.menuItemParams.push(new MenuItemParam({
      caption : 'Devel',
      action : '',
      url : 'https://trello.com/c/o4Ud2Bdd/3-doc-angular',
      target: '_blank'
    }));  
 

  }
}

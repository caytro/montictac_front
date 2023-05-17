import { Component, OnInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuItemParam } from 'src/app/core/models/menu-item-param.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  menuItemParams: MenuItemParam[] = [];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.menuItemParams.push(new MenuItemParam({
      caption: 'Accueil',
      action: '',
      url: '',
      target: ''
    }));
    this.menuItemParams.push(new MenuItemParam({
      caption: 'Nouvelle Activité',
      action: '',
      url: 'createActivity',
      target: ''
    }));
    // this.menuItemParams.push(new MenuItemParam({
    //   caption : 'Stats',
    //   action : 'onClick()',
    //   url : '',
    //   target: ''
    // }));
    this.menuItemParams.push(new MenuItemParam({
      caption: 'Devel',
      action: '',
      url: 'https://trello.com/c/o4Ud2Bdd/3-doc-angular',
      target: '_blank'
    }));
  }

  getUserEmail(): string | null {
    return this.auth.getUserEmail();
  }

  onClickLogout() {
    this.auth.logout();
    this.router.navigateByUrl('auth/login');
  }

  onClickLogin(){
    this.router.navigateByUrl('auth/login');
  }
}

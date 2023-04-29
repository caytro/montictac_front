import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {

  }

  getUserEmail(): string | null{
    return this.auth.getUserEmail();
  }
  
  onClickLogout() {
    this.auth.logout();
    this.router.navigateByUrl('auth/login');
  }


}

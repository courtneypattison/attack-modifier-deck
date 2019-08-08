import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'amd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInitial: Observable<string>;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.userInitial = this.authService.getUserInitial();
  }

  signOut() {
    this.authService.signOut();
  }
}

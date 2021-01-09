import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { signOut } from '../../auth/actions/auth.actions';
import * as fromAuth from '../../auth/reducers';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'amd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInitial: Observable<string>;

  constructor(public authService: AuthService, private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.userInitial = this.authService.getUserInitial();
  }

  signOut() {
    this.store.dispatch(
      signOut()
    );
  }
}

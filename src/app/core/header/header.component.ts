import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "amd-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userInitial: Observable<string>;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userInitial = this.authService.getUserInitial();
  }

  signOut() {
    this.authService.signOut().then(() => this.router.navigate(["/signin"]));
  }
}

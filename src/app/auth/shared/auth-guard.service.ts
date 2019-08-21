import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree> {
    const routeUrl = route.url.toString();
    const scenarioUrl = 'scenario';
    const signInUrl = 'signin';
    const signUpUrl = 'signup';

    return this.authService.user
      .pipe(
        map(() => { // User signed in
          if (routeUrl === signInUrl || routeUrl === signUpUrl) {
            console.log(`Cannot activate '/${routeUrl}'. Navigate to '/${scenarioUrl}'`);
            return this.router.parseUrl(scenarioUrl);
          } else {
            console.log(`Can activate '/${routeUrl}'`);
            return this.router.parseUrl(routeUrl);
          }

        }), catchError(() => { // No user signed in
          if (routeUrl === signInUrl || routeUrl === signUpUrl) {
            console.log(`Can activate '/${routeUrl}'.`);
            return of(this.router.parseUrl(routeUrl));
          } else {
            console.error(`Cannot activate '/${routeUrl}'. Navigate to '/${signInUrl}'`);
            return of(this.router.parseUrl(signUpUrl));
          }
        })
      );
  }
}

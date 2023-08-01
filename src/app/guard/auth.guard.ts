import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router,private tostr:ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if (this.service.IsloggedIn()) {
        if (route.url.length > 0 ) {
          let menu = route.url[0].path;
          if (menu == 'user') {
            if (this.service.GetUserrole() == 'admin'){
              return true;
            } else {
              this.tostr.warning('you dont have access');
              this.router.navigate(['']);
              return false;
            } 
          }else {
            return true;
          }
        } else {

          return true;
        }
      } else {
        this.router.navigate(['login']);
        return false;
      }
     }
};

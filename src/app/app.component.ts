import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { Joke } from './joke';
let appComponentRef;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  winObj: Window;

  constructor(
    private service: AppService,
    private router: Router,
 private localStorageService: LocalStorageService
  ) {
    appComponentRef = this;
    this.winObj = window;
  }

  ngOnInit(): void {
    this.service.jokes(jk => {
      console.log(jk);
    });
    this.logOutFromBrowserAllTabs();
  }
  login() {
    this.localStorageService.set('loginUser', true);
    this.router.navigate(['search']);
  }
  logout() {
    this.localStorageService.remove('loginUser');
    this.localStorageService.set('logout', true);
    this.router.navigate(['']);
  }
  /**
   * This function refresh all tabs open in browser when user logout from one tab
   */
  private logOutFromBrowserAllTabs() {
    this.winObj.addEventListener('storage', function (e) {
      console.log('appComponentRef', appComponentRef);
      console.log('localstorage changes');

      /* Refresh all tabs in browser at login */
      setTimeout(() => {
        if (e.storageArea['lsloginUser']) {
          // console.log("!e.storageArea.getItem('loginUser')", e.storageArea.lsloginUser);
          if (e.storageArea['lslogout'] === 'true') {
            console.log('e.storageArea.lslogout', e.storageArea['lslogout']);
            setTimeout(() => {
              location.reload();
              e.storageArea['lslogout'] = false;
              appComponentRef.router.navigate(['search']);
            }, 1000);
          }
        } else {
          e.storageArea['lslogout'] = true;
          appComponentRef.router.navigate(['']);
        }
      }, 0);

      /* Refresh all tabs in browser at logout */

      // setTimeout(() => {
      //   if (e.storageArea['lsloginUser']) {
      //     console.log('!e.storageArea.getItem(\'ebillingLoginUser\')', e.storageArea['lsloginUser']);
      //     e.storageArea['lslogout'] = false;
      //   }
      //   console.log('!e.storageArea.lslogout', e.storageArea['lslogout']);
      //   if (e.storageArea['lslogout'] === 'true') {
      //     setTimeout(() => {
      //       location.reload();
      //       e.storageArea['lslogout'] = false;
      //       // appComponentRef.router.navigate(['']);
      //     }, 1000);
      //   }
      // }, 0);

    });
  }
}

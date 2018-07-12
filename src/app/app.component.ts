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
    // private router: Router,
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
  }
  logout() {
    this.localStorageService.remove('loginUser');
    this.localStorageService.set('logout', true);
  }
  /**
   * This function refresh all tabs open in browser when user logout from one tab
   */
  private logOutFromBrowserAllTabs() {
    this.winObj.addEventListener('storage', function (e) {
      console.log('appComponentRef', appComponentRef);
      console.log('localstorage changes');
      setTimeout(() => {
        if (e.storageArea.lsebillingLoginUser) {
          console.log('!e.storageArea.getItem(\'ebillingLoginUser\')', e.storageArea.lsebillingLoginUser);
          e.storageArea.lslogout = false;
        }
        console.log('!e.storageArea.lslogout', e.storageArea.lslogout);
        if (e.storageArea.lslogout === 'true') {
          setTimeout(() => {
            location.reload();
            e.storageArea.lslogout = false;
            // appComponentRef.router.navigate(['']);
          }, 1000);
        }
      }, 0);
    });
  }
}

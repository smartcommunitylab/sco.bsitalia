import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LANGUAGES } from './core.utils';
import { SessionStorageService } from 'ngx-webstorage';
import { LoginService } from './shared/login/login.service';
import { AuthService } from './shared/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sco-bsitalia';
  languages = LANGUAGES;
  currentLanguage = 'it';
  isAuthenticated = false;

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    console.log('init');
    this.authService.init().then(() => {
      this.isAuthenticated = this.authService.isLoggedIn();
      this.authService.subscribeSignedIn().then(() => {
        this.isAuthenticated = this.authService.isLoggedIn();
      });
    });

  }


  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.currentLanguage = languageKey;
    this.translateService.use(languageKey);
  }

  login(): void {
    this.authService.startAuthentication();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  getName(): string {
    const account = this.authService.getAccount();
    return account ? account.firstName + ' ' + account.lastName : '';
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BASE_URL } from 'src/app/app.constants';
import { Account } from '../user/account.model';
import { StateStorageService } from './state-storage.service';

export function getClientSettings(): UserManagerSettings {
  const url = BASE_URL || window.location.protocol + '//' + window.location.host + '/';
  return {
      authority: 'https://aac.platform.smartcommunitylab.it/aac/',
      client_id: '',
      redirect_uri: url + 'auth-callback',
      post_logout_redirect_uri: url,
      response_type: 'code',
      scope: 'openid profile',
      filterProtocolClaims: true,
      loadUserInfo: true
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
  private user: User | null = null;
  private account: Account | null = null;

  constructor(
    private stateStorageService: StateStorageService,
    private router: Router
    )
  {
  }

  init(): Promise<Account | null> {
    return this.manager.getUser().then(user => {
      this.user = user;
      return this.getAccount();
    });
  }

  checkLoggedIn(): Promise<boolean> {
    return this.user != null ? Promise.resolve(this.isLoggedIn()) : this.init().then(() => this.isLoggedIn());
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }
  getClaims(): any {
    return this.user?.profile;
  }
  getAccount(): Account | null {
    if (this.account === null && this.user !== null) {
      this.account = new Account(
        true,
        [],
        this.user?.profile.email || this.user?.profile.username || this.user?.profile.preferred_username || '',
        this.user?.profile.given_name || '',
        'it',
        this.user?.profile.family_name || '');

    }
    return this.account;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user?.token_type} ${this.user?.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
        this.user = user;
        this.getAccount();
        this.navigateToStoredUrl();
    });
  }

  login(): void {
    this.startAuthentication();
  }

  logout(): void{
    this.user = null;
    this.account = null;
    this.manager.signoutRedirect();
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl() || '/';
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}

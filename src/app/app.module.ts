import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ActiveMenuDirective, FindLanguageFromKeyPipe } from './core.utils';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BSIconComponent } from './shared/bsitalia/bs-icon.component';
import { BSPaginationComponent } from './shared/bsitalia/bs-pagination.component';
import { BSStickyNavbarDirective } from './shared/bsitalia/bs-sticky-navbar.directive';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserRouteAccessService } from './shared/auth/user-route-access-service';
import { AuthCallbackComponent } from './shared/auth/auth-callback/auth-callback.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
// tslint:disable-next-line:typedef
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    ActiveMenuDirective,
    FindLanguageFromKeyPipe,
    BSIconComponent,
    BSPaginationComponent,
    BSStickyNavbarDirective,
    AuthCallbackComponent,
    LandingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'it',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [UserRouteAccessService],
  bootstrap: [AppComponent],
  exports: [
    TranslateModule,
    FindLanguageFromKeyPipe,
    BSIconComponent,
    BSPaginationComponent,
    BSStickyNavbarDirective
  ]
})
export class AppModule { }

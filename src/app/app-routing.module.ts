import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthCallbackComponent } from './shared/auth/auth-callback/auth-callback.component';
import { UserRouteAccessService } from './shared/auth/user-route-access-service';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

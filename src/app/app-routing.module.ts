import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { BlogComponent } from './pages/blog/blog.component';
import { CmsComponent } from './pages/cms/cms.component';
import { PlansComponent } from './pages/plans/plans.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { UsersComponent } from './pages/users/users.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ErrorsComponent } from './pages/errors/errors.component';
import { MarketersComponent } from './pages/marketers/marketers.component';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cms',
    component: CmsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'plans',
    component: PlansComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactUsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'discounts',
    component: DiscountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'errors',
    component: ErrorsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'marketers',
    component: MarketersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/:id',
    component: PostsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

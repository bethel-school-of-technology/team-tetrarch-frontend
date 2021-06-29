import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
//import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const itemModule = () => import('./item/item.module').then(x => x.ItemModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', loadChildren: usersModule },
    { path: 'item', loadChildren: itemModule},
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
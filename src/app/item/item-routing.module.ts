import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemLayoutComponent } from './item-layout.component';
import { ItemListComponent } from './item-list.component';
import { AddEditItemComponent } from './add-edit-item.component';

const routes: Routes = [
    {
        path: '', component: ItemLayoutComponent,
        children: [
            { path: '', component: ItemListComponent },
            { path: 'add', component: AddEditItemComponent },
            { path: 'edit/:itemId', component: AddEditItemComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemRoutingModule { }
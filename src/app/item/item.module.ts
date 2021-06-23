import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './item-routing.module';
import { ItemLayoutComponent } from './item-layout.component';
import { ItemListComponent } from './item-list.component';
import { AddEditItemComponent } from './add-edit-item.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        ItemLayoutComponent,
        ItemListComponent,
        AddEditItemComponent
    ]
})
export class UsersModule { }
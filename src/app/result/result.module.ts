import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from '../users/users-routing.module';
import { LayoutComponent } from '../users/layout.component';
import { ListComponent } from '../users/list.component';
import { AddEditComponent } from '../users/add-edit.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class ResultModule { }
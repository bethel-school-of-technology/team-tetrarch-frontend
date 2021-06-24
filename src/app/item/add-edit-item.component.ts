import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {  AlertService, ItemService } from '@app/_services';

@Component({ templateUrl: 'add-edit-item.component.html' })
export class AddEditItemComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // change in value not required in edit mode
        const currencyValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            currencyValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            itemName: ['', Validators.required],
            itemConsole: ['', Validators.required],
            itemDescription: ['', Validators.required],
            itemQuantity: ['', Validators.required],
            itemStoreName: ['', Validators.required],
            itemValue: ['', currencyValidators]
        });

        if (!this.isAddMode) {
            this.itemService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.itemName.setValue(x.itemName);
                    this.f.itemConsole.setValue(x.itemConsole);
                    this.f.itemDescription.setValue(x.itemDescription);
                    this.f.itemQuantity.setValue(x.itemQuantity);
                    this.f.itemStoreName.setValue(x.itemStoreName);
                    this.f.itemPrice.setValue(x.itemPrice);
                    
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createItem();
        } else {
            this.updateItem();
        }
    }

    private createItem() {
        this.itemService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Item added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateItem() {
        this.itemService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
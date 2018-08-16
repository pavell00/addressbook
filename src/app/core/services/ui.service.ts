import { Injectable } from '@angular/core';
import { MatSnackBar } from '../../../../node_modules/@angular/material';

@Injectable()
export class UIService {
    
    constructor(private snackbar: MatSnackBar) {}

    showShackBar(message, action, duration, cssClass) {
        this.snackbar.open(message, action, {
            duration: duration,
            panelClass: cssClass
        })
    }
}
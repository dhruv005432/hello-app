import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  step: number = 1;
  emailOrPhone: string = '';
  password: string = '';
  otp: string = '';
  generatedOTP: string = '';
  hidePassword: boolean = true;
  showThankYou: boolean = false;

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  // Step 1: Form Submit
  onSubmit(form: NgForm) {
    debugger;

    if (!this.emailOrPhone || !this.password) {
      this.snackBar.open('❌ Please fill all fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
      return;
    }

    console.log('🟢 Login Attempt:', JSON.stringify({ emailOrPhone: this.emailOrPhone, password: this.password }));

    // Simulate OTP Generation
    this.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('📩 OTP Generated:', this.generatedOTP);

    this.snackBar.open('✅ OTP Generated Successfully', 'OK', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });

    this.step = 2;
  }

  // Step 2: Verify OTP
  verifyOTP() {
    debugger;

    if (this.otp !== this.generatedOTP) {
      this.snackBar.open('❌ Invalid OTP, please try again!', 'Close', {
        duration: 3000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
      return;
    }

    // Success
    this.snackBar.open('🎉 Welcome back!', 'OK', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });

    const userData = {
      emailOrPhone: this.emailOrPhone,
      loginTime: new Date().toLocaleString()
    };

    localStorage.setItem('loggedUser', JSON.stringify(userData));
    console.log('✅ User Stored in localStorage:', JSON.stringify(userData));

    this.showThankYou = true;

    setTimeout(() => {
      this.router.navigate(['/admin-panel']);
    }, 2500);
  }

  backToEmail() {
    this.step = 1;
    this.otp = '';
  }

  forgotPassword() {
    this.snackBar.open('🔐 Password reset link sent to your registered email/phone.', 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}

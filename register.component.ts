import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step = 1;
  hidePassword = true;
  hideConfirm = true;
  user: any = {
    fullName: '',
    email: '',
    phone: '',
    countryCode: '',
    dob: '',
    age: '',
    password: '',
    confirmPassword: '',
    status: 'Pending'
  };

  countryCodes = ['+91', '+1', '+44', '+63', '+62', '+81'];

  constructor(private snackBar: MatSnackBar) {}

  nextStep(form: any) {
    if (form.valid) {
      this.step++;
    } else {
      this.snackBar.open('Please fill required fields!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
    }
  }

  previousStep() {
    this.step--;
  }

  calculateAge(event: any) {
    const birthDate = new Date(event.target.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.user.age = age;
  }

  onRegister(form: any) {
    debugger;
    if (form.valid && this.user.password === this.user.confirmPassword) {
      let allUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      this.user.status = 'Success';
      allUsers.push(this.user);
      localStorage.setItem('registeredUsers', JSON.stringify(allUsers));

      console.log('User Registered:', JSON.stringify(this.user));

      this.snackBar.open('Registration Successful 🎉', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });

      this.step = 5;
    } else {
      this.snackBar.open('Check your details or password mismatch!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
    }
  }
}

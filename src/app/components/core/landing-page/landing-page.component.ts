import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { SharedService } from '../../../services/shared.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as AOS from 'aos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {


  isPasswordVisible: boolean = false;
  loginForm!: FormGroup;
  loading: boolean = false;
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private auth: Auth, private sharedService: SharedService, private toastr: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    AOS.init({
      duration: 100,
      once: true
    });
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  login() {
    this.router.navigate(['/stats']);
    this.closeModal.nativeElement.click();
    // return
    // this.loginForm.markAllAsTouched();
    // if (this.loginForm.valid) {
    //   this.loading = true;
    //   const formURlData = new URLSearchParams();
    //   formURlData.set('email', this.loginForm.value.email);
    //   formURlData.set('password', this.loginForm.value.password);
    //   this.sharedService.postAPI('login', formURlData.toString()).subscribe({
    //     next: (resp: any) => {
    //       if (resp.success == true) {
    //         this.sharedService.setToken(resp.data);
    //         this.toastr.success(resp.message);
    //         this.loading = false;
    //         //this.closeModal.nativeElement.click();
    //         window.location.reload();
    //       } else {
    //         this.toastr.warning(resp.message);
    //         this.loading = false;
    //       }
    //     },
    //     error: (error) => {
    //       this.loading = false;
    //       this.toastr.error('Invalid password. Please try again.')
    //     }
    //   });
    // }
  }

  googleDetail: any;

  async signInWithGoogle() {
    console.log('User signed in:');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider, browserPopupRedirectResolver);
      console.log('User signed in:', result.user);
      this.googleLogin(result.user);
      //this.googleDetail = result.user;
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  }

  googleLogin(userDet: any) {
    //this.loginForm.markAllAsTouched();

    this.loading = true;

    const fullName = userDet.displayName; // Example: "Palash Jain"
    const [firstName, ...rest] = fullName.split(' '); // Split by space
    const lastName = rest.join(' '); // Join the remaining parts as last name

    const formURlData = new URLSearchParams();
    formURlData.set('first_name', firstName);
    formURlData.set('last_name', lastName);
    formURlData.set('email', userDet.email);
    formURlData.set('profile_image', userDet.photoURL);
    this.sharedService.postAPI('google-login', formURlData.toString()).subscribe({
      next: (resp: any) => {
        if (resp.success == true) {
          //this.sharedService.setToken(resp.data);
          this.toastr.success(resp.message);
          this.loading = false;
          //this.closeModal.nativeElement.click();
          window.location.reload();
        } else {
          this.toastr.warning(resp.message);
          this.loading = false;
        }
      },
      error: (error) => {
        this.loading = false;
        this.toastr.error('Something went wrong!');
        // if (error.error.message) {
        //   this.toastr.error(error.error.message);
        // } else {
        //   this.toastr.error('Something went wrong!');
        // }
      }
    });
  }

  //(click)="signInWithGoogle()"
  //routerLink="/stats"


}

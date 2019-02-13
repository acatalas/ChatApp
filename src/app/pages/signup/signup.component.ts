import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enums';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private alertService: AlertService,
    private loadingService: LoadingService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
 
  public submit(): void {
    this.loadingService.isLoading.next(true);
    // TODO call the auth service
    if(this.signupForm.valid){
      const {firstName, lastName, email, password} = this.signupForm.value;
      console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${password}`);
      this.loadingService.isLoading.next(false);
    } else {
      const failedSignupAttempt = new Alert('Your email or password are not valid or empty', AlertType.Danger);
      setTimeout(() => {
        this.loadingService.isLoading.next(false);
        this.alertService.alerts.next(failedSignupAttempt);
      }, 2000);
    }
    
 
  }
}

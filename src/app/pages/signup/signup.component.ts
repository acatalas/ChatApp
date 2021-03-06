import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enums';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(private fb: FormBuilder, 
    private alertService: AlertService,
    private loadingService : LoadingService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    
      this.createForm();
   }

   ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  
  //Method called when the user clicke the "submit" button
  public submit(): void {
    //Checks if the form is valid checking the values inputted by the user
    if(this.signupForm.valid){
      //Shows loading screen
      this.loadingService.isLoading.next(true);
      //Saves the form's fields to an object
      const {firstName, lastName, email, password} = this.signupForm.value;
      this.subscriptions.push(
        //Calls the Auth Service to create the user
        this.authService.signup(firstName, lastName, email, password).subscribe(success =>  {
          if(success) {
            //If the user is created successfully, takes the user to the chat page
            this.router.navigateByUrl(this.returnUrl);
          }
          //Stops loading screen
          this.loadingService.isLoading.next(false);
        })
      );
      //Stops loading and shows error message
    } else {
      const failedSignupAttempt = new Alert('Please insert a valid email address and/or password.', AlertType.Danger);
      this.loadingService.isLoading.next(false);
      this.alertService.alerts.next(failedSignupAttempt);
    }
  }
}
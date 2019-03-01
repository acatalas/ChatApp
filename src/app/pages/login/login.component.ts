import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alert-type.enums';
import { Alert } from '../../classes/alert';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Component in charge of validating the login form, signing up a user and showing
 * an alert message if an error was produced.
 */
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  //Adds validators to the form on loading the component
  constructor(
    private fb: FormBuilder, 
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,
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
  
  //Adds validators to the form
  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Method executed when the user clicks the submit button. Checks the login form's validity
   * and uses the Auth service to add a new user to the application
   * */
  public submit(): void{
    if(this.loginForm.valid){
      //Shows the loading screen
      this.loadingService.isLoading.next(true);

      //Saves the values inputted in the form to an object
      const {email, password} = this.loginForm.value;
      this.subscriptions.push(
        //Tries to log in
        this.auth.login(email, password).subscribe(success => {
          if(success) {
            //If logged in, the router will move to the chat page
            this.router.navigateByUrl(this.returnUrl);
          } else {
            //Display an alert
            this.displayFailedLogin();
          }
          //Stop showing loading screen
          this.loadingService.isLoading.next(false);
        })
      );
    } else {
      //Stop showing loading screen and show alert if the form input is not valid
      this.loadingService.isLoading.next(false);
      this.displayFailedLogin();
    }
  }

  //Displays an alert message via the alert service
  private displayFailedLogin(): void {
    const failedLoginAlert = new Alert('Wrong email/password combination.', AlertType.Danger);
    this.alertService.alerts.next(failedLoginAlert);
   }
}

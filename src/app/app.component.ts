import { Component, HostListener, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppConfig, APP_CONFIG } from './app.config.module';
import { Contact } from './models/contact';
import { FakeEmailValidator } from './validations/fake-email-validator';
// import { APP_CONFIG, IAppConfig } from './services/config-service';
// import { NameValidator } from './validations/name.validator';
import { NameValidator } from '@srcvalidations/name.validator';
import { AppSettingsService } from './shared/appsettings.service';
import { AppSettings } from './shared/appsettings';
// import { ContactFormComponent } from './wizard/contact-form/contact-form.component';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { ContactSearchComponent } from 'contacts/contact-search.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-flex-example';
  isLinear = true;
  formNameGroup! : FormGroup;
  formPasswordGroup! : FormGroup;
  formEmailGroup! : FormGroup;
  formPhoneGroup! : FormGroup;
  contact: Contact = {};
  ProfileForm!: FormGroup;  
  PersonalDetailForm!: FormGroup;  
  // Binding
  firstName! : string;
  userName! : string;
  password!: string;
  inputSliderValue!: string;
  //host listenser : hight and width of a screen
  public getScreenWidth: any;
  public getScreenHeight: any;

  // Radio button fiding divs
  sh: any;
  isChecked: boolean = true;
  searchData! : any;
  constructor(@Inject(APP_CONFIG) private config: AppConfig, 
        private tosterService : ToastrService, 
        private fb: FormBuilder,
        private settingsService: AppSettingsService ) { 
    console.log(this.config.apiEndpoint)

  }  
  settings: AppSettings;
  ngOnInit() {  
    
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.createForm();
    this.ProfileForm = this.fb.group({  
      EmployeeName: [''],
      Age: ['']  
    })  
    this.PersonalDetailForm = this.fb.group({  
      Address: [''],  
      City: ['']  
    })  
    this.settingsService.getSettings().subscribe(setting => 
    {
      this.settings = setting;
      console.log(this.settings.defaultAuthUrl);
    });
  }  


@HostListener('window:resize', ['$event'])
onWindowResize() {
  this.getScreenWidth = window.innerWidth;
  this.getScreenHeight = window.innerHeight;
}
  
  get m(){
    return this.formNameGroup.controls;
  }
   
  onSubmit(){
    let x = this.formNameGroup.getRawValue();
    this.tosterService.success("Success", "Data shown successfully !!");
    console.log(this.formNameGroup.value);
  }
    add() {  
    alert("Employee Details Save successfully")  
  }    
  public createForm() {
      this.formNameGroup  = this.fb.group({
        userName: ['', [Validators.required, Validators.minLength(3), NameValidator.noWhiteSpace]],
        passWord: ['',  Validators.compose([Validators.required, Validators.minLength(3), NameValidator.noWhiteSpace])],    
        dateRange: new FormGroup({
            start: new FormControl(''),
            end: new FormControl('')
          }),
          emailID: ['',  Validators.compose([Validators.required, Validators.email, NameValidator.noWhiteSpace])],    
          // emailID: ['',[Validators.required, FakeEmailValidator]]
        });


      this.formPasswordGroup  = this.fb.group({
        passWord: ['',  Validators.compose([Validators.required, Validators.minLength(3), NameValidator.noWhiteSpace])]
      });
      this.formEmailGroup  = this.fb.group({
        ... this.formNameGroup, // spread operator
        emailID: ['', Validators.compose([Validators.required, Validators.email])]
      });
      this.formPhoneGroup  = this.fb.group({
        mobile: ['', Validators.compose([Validators.required, Validators.min(10)])]
      });
    }
}

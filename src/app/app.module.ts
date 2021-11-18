import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { ContactFormComponent } from './wizard/contact-form/contact-form.component';

//import { AppRoutingModule } from './app-routing.module';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { FormsModule,ReactiveFormsModule} from '@angular/forms';  
import { MatStepperModule } from '@angular/material/stepper';  
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from "@angular/material/button";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'
//import { MatStep, MatStepper } from "@angular/material/stepper"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCardModule } from "@angular/material/card";
import { MatSliderModule } from "@angular/material/slider";
import 'hammerjs';
import { PersonalInfoComponent } from './contacts/personal-info/personal-info.component';
import { CompanyInfoComponent } from './contacts/company-info/company-info.component';
import { BootsrapJobInfoComponent } from './layout/bootsrap-job-info/bootsrap-job-info.component';
// import { TemplateFormComponent } from './layout/template-form/template-form.component';
import { RouterModule, Routes } from '@angular/router';


import { LoginModule} from './login/login.module';
import { DashboardModule} from './dashboard/dashboard.module';
import { RegistrationModule} from './registration/registration.module';
import { LayoutModule} from './layout/layout.module';
import {UsersModule} from './users/users.module';
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatListModule } from  '@angular/material/list';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './services/error-intercept.service';
// import { AppConfig, APP_CONFIG } from './configs/app.config';
import { ConfigService } from './services/config-service';
import { AppConfigModule } from './app.config.module';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ContactSearchComponent } from './contacts/contact-search.component';
import { InputSliderComponent } from './fields/input-slider.component';
import { FakeEmailValidator } from './validations/fake-email-validator'
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module'
@NgModule({  
  declarations: [  
    AppComponent, 
    ContactFormComponent, 
    PersonalInfoComponent, 
    CompanyInfoComponent, 
    BootsrapJobInfoComponent, 
    ContactSearchComponent, 
    InputSliderComponent, 
    FakeEmailValidator,
    // TemplateFormComponent, 
  ],  

  imports: [  
    BrowserModule, FormsModule, ReactiveFormsModule
    ,AppRoutingModule
    ,BrowserAnimationsModule
    ,MatStepperModule 
    ,MatButtonModule
    ,MatFormFieldModule
    ,FlexLayoutModule
    ,MatIconModule
    ,MatInputModule 
    ,MatToolbarModule
    ,MatSidenavModule
    ,MatListModule
    ,MatAutocompleteModule
    ,MatCardModule 
    ,MatSliderModule
    ,LayoutModule
    ,LoginModule
    ,DashboardModule
    ,RegistrationModule
    ,UsersModule
    ,AccountSettingsModule 
    ,HttpClientModule  
    ,AppConfigModule 
    ,MatDatepickerModule
    ,MatFormFieldModule
    ,MatNativeDateModule  
    ,ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
    SharedModule,
  ],  
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },    
    //{ provide: APP_CONFIG, useClass: ConfigService }  
  ],
  bootstrap: [AppComponent]  
})  
export class AppModule { }  

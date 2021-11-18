import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { DisplayValueMap } from 'src/app/models/display-value-map';
import { countryDefaults } from '../../constants/countries';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  formNameGroup : FormGroup= new FormGroup({});
  countryList: DisplayValueMap[] = countryDefaults
  // contactForm: FormGroup = new FormGroup({});
  @Input() contact!: Contact
  constructor(private fb: FormBuilder) { }  

  ngOnInit(): void {
  }
  public createForm() {
    this.formNameGroup = new FormGroup({
      firstname: new FormControl([this.contact.firstName, [Validators.required, Validators.pattern('^[a-zA-Z. \-\]*$')]]),
      lastname: new FormControl(),
      email: new FormControl([
        Validators.required,
        Validators.email,
        this.forEmailValidator("bob") // <-- Here's how you pass in the custom validator.
      ]),
      gender: new FormControl(),
      isMarried: new FormControl(),
      country: new FormControl()
    })
    

    // this.formNameGroup  = this.fb.group({
    //   userName: ['', Validators.required]
    // });
  }
 forEmailValidator(email:string) : boolean{
   return true;
 }
 onSubmit() {
  console.log(this.formNameGroup.value);
}}

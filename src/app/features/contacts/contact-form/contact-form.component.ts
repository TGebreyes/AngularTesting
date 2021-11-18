import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { AddressesFormComponent } from './addresses-form/addresses-form.component';
import { BasicInfoFormComponent } from './basic-info-form/basic-info-form.component';
import { PhonesFormComponent } from './phones-form/phones-form.component';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
const BASIC_INFO_INDEX: number = 0;
const ADDRESSES_INDEX: number = 1;
const PHONES_INDEX: number = 2;
const REVIEW_INDEX: number = 3;

export class ContactFormComponent implements OnInit, AfterViewInit, OnDestroy {


  errorMessages: string[] = [];
  contact: Contact = {} as Contact;
  currentStepIndex: number = 0;
  basicInfoFormSubscription: Subscription | undefined;
  formSubmitted: boolean = false;
  allFormsValid: boolean = false;
 
  @ViewChild(BasicInfoFormComponent)
  basicInfoComponent!: BasicInfoFormComponent;
  @ViewChild(AddressesFormComponent) addressesComponent!: AddressesFormComponent;
  @ViewChild(PhonesFormComponent) phonesComponent!: PhonesFormComponent;  
  constructor(private alertService: AlertService, private contactService: ContactService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.basicInfoFormSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    //gotta do this here so we have a handle on the child components
    this.handleSubscriptions();
  }

  private handleSubscriptions() {
    this.handleBasicInfoFormSubscription();
  }

  private handleBasicInfoFormSubscription() {
    //tracks changes to the form
    //if the form becomes invalid, this will light the icon button red
    //if the invalid form becomes valid, it will turn the icon button to original color
    this.basicInfoFormSubscription = this.basicInfoComponent
      .basicInfoFormGroup
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(
        (values) => {
          this.handleFormCheck();
        }
      );
  }

  private handleFormCheck() {
    this.handleBasicInfoFormCheck();
  }

  private handleBasicInfoFormCheck() {
    if (this.currentStepIndex == BASIC_INFO_INDEX) {
      if (this.basicInfoComponent.basicInfoFormGroup.valid) {
        this.clearIconError(BASIC_INFO_INDEX);
      }   
    }
  }

  onStepChange(event: any) {
    let previousIndex: number = event.previouslySelectedIndex;
    let currentIndex: number = event.selectedIndex;

    this.currentStepIndex = currentIndex;

    if (previousIndex == BASIC_INFO_INDEX) {
      this.basicInfoComponent.populateContact(this.contact);

      let validForm: boolean = (this.basicInfoComponent.basicInfoFormGroup.valid);
      if (!validForm) {
        this.changeIcon(previousIndex);
        this.allFormsValid = false;
      } else {
        this.clearIconError(previousIndex);
        this.allFormsValid = true;
      }
    } else if (previousIndex == ADDRESSES_INDEX) {
      this.addressesComponent.populateContact(this.contact);
    } else if (previousIndex == PHONES_INDEX) {
      this.phonesComponent.populateContact(this.contact);
    }

    if (currentIndex == REVIEW_INDEX) {
      this.validateForms();
    }
  }

  private clearIconError(index: number) {
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    iconElement.classList.remove('mat-step-icon-invalid');
  }

  private changeIcon(index: number) {
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    iconElement.classList.add('mat-step-icon-invalid');
  }

  private getIconElementByIndex(index: number): HTMLElement {
    let nodeList: NodeList = document.querySelectorAll('.mat-step-icon');
    let node: Node = nodeList.item(index);

    return (<HTMLElement>node);
  }

  private validateForms() {    
    this.errorMessages = [];

    this.validateBasicInfoForm();
    this.validateAtLeastOneContactMethod();
  }

  private validateBasicInfoForm() {
    let basicInfoForm: FormGroup = this.basicInfoComponent.basicInfoFormGroup;

    Object.keys(basicInfoForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = basicInfoForm.get(key).errors;
      if (controlErrors != null) {
        this.addErrorByKey(key);    
      }
    });
  }

  private validateAtLeastOneContactMethod() {
    if (!this.contact.email
      && (!this.contact.addresses || this.contact.addresses.length == 0)
      && (!this.contact.phones || this.contact.phones.length == 0)) {

        this.errorMessages.push("Please include at least one method of contact (phone, email, address)")
    }
  }

  private addErrorByKey(key: string) {
    if (key == 'firstName') this.errorMessages.push("Please enter a valid first name");
    if (key == 'lastName') this.errorMessages.push("Please enter a valid last name");
    if (key == 'source') this.errorMessages.push("Please select a source");
  }

  saveInfo() {
    this.alertService.clear();
    this.formSubmitted = true;
    this.createContact();
  }

  private createContact() {
    this.contactService.create(this.contact)
      .subscribe(
        (contact: Contact) => this.handleContactSaveResponse(contact),
        err => this.handleContactSaveError(err)
      );
  }

  private handleContactSaveResponse(contact: Contact) {
    this.contact = contact;
    this.formSubmitted = false;
    this.alertService.success("Contact successfully created!");
    this.scrollToTop();
  }

  private handleContactSaveError(err) {
    console.error(err);
    this.formSubmitted = false;
    this.alertService.error("There was a problem - please contact support");
    this.scrollToTop();
  }

  private scrollToTop() {
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scrollTo(0, 0);
  }
}

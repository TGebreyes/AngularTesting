import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  model : User = {
     name:"tilahun",
     email: "til@gmail.com",
     hobbies: "Running",
     password:"abc123"
  };

  hobbies: string[] = [
    'Acrobatics',
    'Acting',
    'Animation',
    'Astronomy',
    'Baking'
  ];
  ngOnInit(){
    
  }
  constructor() { }

  onSubmit(form: any) {
    console.log(form.value)
  }
}

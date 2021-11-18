import { ElementSchemaRegistry } from "@angular/compiler";
import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: "app-input-slider",
    templateUrl: "./input-slider.component.html",
    styleUrls: ["./input-slider.component.scss"],
    providers: []
})
export class InputSliderComponent {

  constructor(private element: ElementRef) 
  { 

  }


    /**
     * Holds the current value of the slider
     */
    @Input() value: string = "";

    /**
     * Invoked when the model has been changed
     */
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    updateValue(event: Event){
      this.value = (event.target as HTMLInputElement).value;;
      this.valueChange.emit(this.value);
    }
 }
 
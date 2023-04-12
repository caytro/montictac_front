import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})

export class FocusDirective implements AfterViewInit{

  constructor(private el:ElementRef, private renderer:Renderer2) { 
    
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    this.renderer.setStyle(this.el.nativeElement,"color","green");
    this.el.nativeElement.focus();
  }
  

  @HostListener('onShow') setFocus(){

    this.el.nativeElement.focus();
    console.log("setFocus! ");
  }

}
